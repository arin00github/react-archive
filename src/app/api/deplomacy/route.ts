import DeploymacyApi from "@/service/backend/DeploymacyApi";

export async function GET() {
  try {
    // const dbMaster = await connectToDatabase();

    const apiRes = await DeploymacyApi.getCountryInfoWidthPortal();

    if (apiRes.status === 200) {
      return Response.json({ result: apiRes.data.response.body });
    }

    return Response.json({ result: null });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "error" });
  }
}
