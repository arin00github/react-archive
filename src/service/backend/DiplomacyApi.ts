import { apiServer } from "../axiosInstance";

class DiplomacyApi {
  private static instance: DiplomacyApi;

  private constructor() {} // 외부에서 인스턴스를 생성하지 못하도록 private constructor

  public static getInstance(): DiplomacyApi {
    if (!DiplomacyApi.instance) {
      DiplomacyApi.instance = new DiplomacyApi();
    }
    return DiplomacyApi.instance;
  }

  public async getCountryInfoWidthPortal(params: { pageNo: string }) {
    const query = `serviceKey=${process.env.PUBLIC_DATA_KEY}&pageNo=${params.pageNo}&numOfRows=10`;
    const url = `${process.env.WORLD_BASE_URL}?${query}`;
    return apiServer.get(url);
  }
}

export default DiplomacyApi.getInstance();
