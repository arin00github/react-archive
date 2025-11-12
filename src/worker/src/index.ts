/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

interface Env {
  API_KEY: string;
  PUBLIC_DATA_KEY: string;
}

const WORLD_BASE_URL =
  "http://apis.data.go.kr/1262000/OverviewKorRelationService/getOverviewKorRelationList";
const ALLOWED_ORIGIN = [
  "http://localhost:3000", // dev (Next.js)
  "https://username.github.io", // prod (GitHub Pages)
];
// https://my-worker.username.workers.dev

function getDeplomacyListUrl(params: { pageNo: string; env: Env }) {
  const query = `serviceKey=${params.env.PUBLIC_DATA_KEY}&pageNo=${params.pageNo}&numOfRows=10`;
  const url = `${WORLD_BASE_URL}?${query}`;
  return url;
}

export default {
  async fetch(request, env): Promise<Response> {
    const origin = request.headers.get("Origin") || "";
    const isAllowed = ALLOWED_ORIGIN.includes(origin);

    //console.log("[worker] request", request);
    console.log("[env]", env);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": isAllowed ? origin : "",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
          Vary: "Origin",
        },
      });
    }

    // 외부 API 엔드포인트 설정
    //const param = request;
    const targetUrl = getDeplomacyListUrl({ pageNo: "1", env });
    console.log("targetUrl", targetUrl);

    // 본문/메서드 전달
    const body = ["GET", "HEAD"].includes(request.method)
      ? undefined
      : await request.arrayBuffer();

    // 인증 헤더 주입(외부 API 요구사항에 맞게 변환)
    const headers = new Headers();
    headers.set(
      "Content-Type",
      request.headers.get("Content-Type") || "application/json"
    );
    // headers.set("Authorization", `Bearer ${env.API_KEY}`);
    let upstream: Response;

    try {
      upstream = await fetch(targetUrl, {
        method: request.method,
        headers,
        body,
      });
    } catch {
      return new Response(JSON.stringify({ error: "upstream failed" }), {
        status: 502,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": isAllowed ? origin : "",
          Vary: "Origin",
        },
      });
    }

    // 응답에 CORS만 붙여서 그대로 반환
    const respHeaders = new Headers(upstream.headers);
    respHeaders.set("Access-Control-Allow-Origin", isAllowed ? origin : "");
    respHeaders.set("Vary", "Origin");

    //console.log("upstream", upstream);
    // const data = await upstream.json();
    // console.log("data", data);

    return new Response(upstream.body, {
      status: upstream.status,
      headers: respHeaders,
    });
  },
} satisfies ExportedHandler<Env>;
