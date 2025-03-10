import { NextRequest } from "next/server";

import DiplomacyApi from "@/service/backend/DiplomacyApi";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    console.log("searchParams", searchParams);

    const country = searchParams.get("country") as string;

    const params = {
      iso: `${country}`,
    };

    const apiRes = await DiplomacyApi.getCountryFlagImage(params);

    const apiRes2 = await DiplomacyApi.getCountryEconomy(params);

    const apiRes3 = await DiplomacyApi.getCountryEnv(params);

    if (
      apiRes.status === 200 &&
      apiRes2.status === 200 &&
      apiRes3.status === 200
    ) {
      return Response.json({
        flag: apiRes.data.response.body.items.item[0],
        economy: apiRes2.data.response.body.items.item[0],
        env: apiRes3.data.response.body.items.item[0],
      });
    }

    return Response.json({ result: null });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "error" });
  }
}
