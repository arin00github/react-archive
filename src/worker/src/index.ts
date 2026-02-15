// /src/worker.ts

interface Env {
  API_KEY: string;
}

const WORLD_BASE_URL =
  "http://apis.data.go.kr/1262000/OverviewGnrlInfoService/getOverviewGnrlInfoList";
const WORLD_GENERAL_URL =
  "http://apis.data.go.kr/1262000/OverviewGnrlInfoService/getOverviewGnrlInfoList";
const WORLD_ECONOMY_URL =
  "http://apis.data.go.kr/1262000/OverviewEconomicService/OverviewEconomicList";
const WORLD_FLAG_URL =
  "http://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2";

const ALLOWED_ORIGIN = [
  "http://localhost:3000", // dev (Next.js)
  "https://arin00github.github.io", // prod (GitHub Pages)
];

const DEFAULT_TIMEOUT_MS = 10000; // 네트워크 정체 방지(왜: CF 무료 플랜에서 장기 연결은 낭비)

const JSON_ENFORCER = "returnType=JSON";

function withQuery(base: string, params: Record<string, string | undefined>) {
  const url = new URL(base);
  Object.entries(params).forEach(([k, v]) => {
    if (v == null) return;
    const value = k === "serviceKey" ? decodeURIComponent(v) : v; // 중요!
    url.searchParams.set(k, value);
  });
  //console.log("URL", url.toString());
  return url.toString();
}
function getDiplomacyListUrl(params: { pageNo: string; env: Env }) {
  return withQuery(WORLD_BASE_URL, {
    serviceKey: params.env.API_KEY,
    pageNo: params.pageNo || "1",
    numOfRows: "10",
    // JSON 강제
    [JSON_ENFORCER.split("=")[0]]: JSON_ENFORCER.split("=")[1],
  });
}

function getCountryDetailUrl(params: { iso: string; env: Env }) {
  const common = {
    serviceKey: params.env.API_KEY,
    [JSON_ENFORCER.split("=")[0]]: JSON_ENFORCER.split("=")[1],
    "cond[country_iso_alp2::EQ]": params.iso,
  };
  return {
    flag: withQuery(WORLD_FLAG_URL, common),
    economy: withQuery(WORLD_ECONOMY_URL, common),
    general: withQuery(WORLD_GENERAL_URL, common),
  };
}

function corsHeaders(origin: string, isAllowed: boolean) {
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

async function fetchJson(
  url: string,
  init?: RequestInit,
  timeoutMs = DEFAULT_TIMEOUT_MS,
) {
  const ac = new AbortController();
  const id = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...(init || {}),
      signal: ac.signal,
      headers: {
        ...(init?.headers || {}),
        Accept: "application/json, text/json, */*;q=0.1",
      },
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`upstream ${res.status}: ${text?.slice(0, 256)}`);
    }
    return await res.json();
  } catch (err) {
    throw err;
  } finally {
    clearTimeout(id);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    console.log("fetcn env", env);

    const origin = request.headers.get("Origin") || "";
    const isAllowed = ALLOWED_ORIGIN.includes(origin);
    const url = new URL(request.url);
    console.log("url", url);

    // Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin, isAllowed),
      });
    }

    // 국가리스트 조회
    if (url.pathname === "/diplomacy") {
      const pageNo = url.searchParams.get("pageNo") || "1";
      const targetUrl = getDiplomacyListUrl({ pageNo, env });

      console.log("targetUrl", targetUrl);

      const passthrough = await fetch(targetUrl, {
        method: "GET",
        headers: { Accept: "application/json, */*;q=0.1" },
      }).catch((e) => {
        console.error(e);
        //return null;
      });
      console.log("passthrough", passthrough);

      if (!passthrough) {
        return new Response(JSON.stringify({ error: "upstream failed" }), {
          status: 502,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders(origin, isAllowed),
          },
        });
      }

      const respHeaders = new Headers(passthrough.headers);
      respHeaders.set("Access-Control-Allow-Origin", isAllowed ? origin : "");
      respHeaders.set("Vary", "Origin");

      return new Response(passthrough.body, {
        status: passthrough.status,
        headers: respHeaders,
      });
    }

    // 국가상세정보 → 3개 API 동시 호출
    if (url.pathname === "/country") {
      const iso = (url.searchParams.get("country") || "").toUpperCase().trim();

      if (!/^[A-Z]{2}$/.test(iso)) {
        return new Response(
          JSON.stringify({
            error: "invalid iso; expected ISO-3166-1 alpha-2 (e.g., KR)",
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders(origin, isAllowed),
            },
          },
        );
      }

      const endpoints = getCountryDetailUrl({ iso, env });

      // 동시 호출
      const [flagRes, economyRes, generalRes] = await Promise.allSettled([
        fetchJson(endpoints.flag),
        fetchJson(endpoints.economy),
        fetchJson(endpoints.general),
      ]);

      const result: Record<string, unknown> = {
        iso,
        flag: flagRes.status === "fulfilled" ? flagRes.value : null,
        economy: economyRes.status === "fulfilled" ? economyRes.value : null,
        general: generalRes.status === "fulfilled" ? generalRes.value : null,
      };

      const errors: Array<{
        name: "flag" | "economy" | "general";
        message: string;
      }> = [];
      if (flagRes.status === "rejected")
        errors.push({ name: "flag", message: String(flagRes.reason) });
      if (economyRes.status === "rejected")
        errors.push({ name: "economy", message: String(economyRes.reason) });
      if (generalRes.status === "rejected")
        errors.push({ name: "general", message: String(generalRes.reason) });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (errors.length > 0) (result as any).errors = errors;

      return new Response(JSON.stringify(result), {
        status: errors.length > 0 ? 207 /* Multi-Status 느낌 */ : 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          ...corsHeaders(origin, isAllowed),
        },
      });
    }

    // 기본: 404 + 사용 가능한 경로 안내(왜: 디버깅 시 헷갈림 방지)
    return new Response(
      JSON.stringify({
        error: "not_found",
        routes: ["/diplomacy?pageNo=1", "/country?country=KR"],
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(origin, isAllowed),
        },
      },
    );
  },
} satisfies ExportedHandler<Env>;
