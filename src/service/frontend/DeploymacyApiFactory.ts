import { apiClient } from "../axiosInstance";

class DeploymacyApiFactory {
  private static instance: DeploymacyApiFactory;

  private constructor() {} // 외부에서 인스턴스를 생성하지 못하도록 private constructor

  public static getInstance(): DeploymacyApiFactory {
    if (!DeploymacyApiFactory.instance) {
      DeploymacyApiFactory.instance = new DeploymacyApiFactory();
    }
    return DeploymacyApiFactory.instance;
  }

  public async getCountryInfo() {
    return apiClient.get("/api/deplomacy");
  }
}

export default DeploymacyApiFactory.getInstance();
