//const PROXY = "http://127.0.0.1:8787";

const PROXY = process.env.NEXT_PUBLIC_WORKER_PROXY;

class DiplomacyApiFactory {
  private static instance: DiplomacyApiFactory;

  private constructor() {} // 외부에서 인스턴스를 생성하지 못하도록 private constructor

  public static getInstance(): DiplomacyApiFactory {
    if (!DiplomacyApiFactory.instance) {
      DiplomacyApiFactory.instance = new DiplomacyApiFactory();
    }
    return DiplomacyApiFactory.instance;
  }

  // public async getDeplomacyList(query: { pageNo: string }) {
  //   return apiClient.get(`/api/diplomacy?${new URLSearchParams(query)}`);
  // }

  // public async getDiplomacyDetail(country: string) {
  //   return apiClient.get(
  //     // `/api/diplomacy/detail?${new URLSearchParams({ country })}`
  //     `/api/country?${new URLSearchParams({ country })}`
  //   );
  // }

  // public async getDeplomacyList(query: { pageNo: string }) {
  //   return apiClient.get(`${PROXY}/diplomacy?${new URLSearchParams(query)}`);
  // }

  public async getDeplomacyList(query: { pageNo: string }) {
    return fetch(`${PROXY}/diplomacy?${new URLSearchParams(query)}`);
  }

  public async getDiplomacyDetail(country: string) {
    return fetch(
      // `/api/diplomacy/detail?${new URLSearchParams({ country })}`
      `${PROXY}/country?${new URLSearchParams({ country })}`,
    );
  }
}

export default DiplomacyApiFactory.getInstance();
