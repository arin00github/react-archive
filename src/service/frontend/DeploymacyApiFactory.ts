import { apiClient } from "../axiosInstance";

class DeplomacyApiFactory {
  private static instance: DeplomacyApiFactory;

  private constructor() {} // 외부에서 인스턴스를 생성하지 못하도록 private constructor

  public static getInstance(): DeplomacyApiFactory {
    if (!DeplomacyApiFactory.instance) {
      DeplomacyApiFactory.instance = new DeplomacyApiFactory();
    }
    return DeplomacyApiFactory.instance;
  }

  public async getDeplomacyList(query: { keyword: string; pageNo: string }) {
    return apiClient.get(`/api/deplomacy?${new URLSearchParams(query)}`);
  }
}

export default DeplomacyApiFactory.getInstance();
