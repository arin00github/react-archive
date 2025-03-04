import DeploymacyApiFactory from "@/service/frontend/DeploymacyApiFactory";
import { useEffect } from "react";

const SearchContainer = () => {
  const getSearchCountrys = async () => {
    try {
      const res = await DeploymacyApiFactory.getCountryInfo();
    } catch (err) {
      console.error("err", err);
    }
  };

  useEffect(() => {
    getSearchCountrys();
  }, []);

  return <div></div>;
};

export default SearchContainer;
