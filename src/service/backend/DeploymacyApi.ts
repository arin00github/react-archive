import { apiServer } from "../axiosInstance";

class DeploymacyApi {
  private static instance: DeploymacyApi;

  private constructor() {} // 외부에서 인스턴스를 생성하지 못하도록 private constructor

  public static getInstance(): DeploymacyApi {
    if (!DeploymacyApi.instance) {
      DeploymacyApi.instance = new DeploymacyApi();
    }
    return DeploymacyApi.instance;
  }

  public async getCountryInfoWidthPortal() {
    const query = `serviceKey=${process.env.PUBLIC_DATA_KEY}&pageNo=1&numOfRows=10`;
    const url = `${process.env.WORLD_BASE_URL}?${query}`;
    return apiServer.get(url);
  }
}

export default DeploymacyApi.getInstance();
