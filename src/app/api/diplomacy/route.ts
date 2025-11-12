import { NextRequest } from "next/server";

import DiplomacyApi from "@/service/backend/DiplomacyApi";

export const dynamic = "force-static";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const pageNo = searchParams.get("pageNo") as string;

    const params = {
      pageNo: `${pageNo}`,
    };

    const apiRes = await DiplomacyApi.getCountryInfoWidthPortal(params);

    if (apiRes.status === 200) {
      return Response.json({ result: apiRes.data.response.body });
    }

    return Response.json({ result: null });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "error" });
  }
}
