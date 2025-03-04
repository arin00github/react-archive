import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/dbconnect";
import DeploymacyApi from "@/service/backend/DeploymacyApi";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // const dbMaster = await connectToDatabase();

    const apiRes = await DeploymacyApi.getCountryInfoWidthPortal();

    if (apiRes.status === 200) {
      console.log("apiRes", apiRes.data.response.body.items.item[0]);
      return Response.json({ result: apiRes.data.response.body });
    }

    return Response.json({ result: null });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "error" });
  }
}
