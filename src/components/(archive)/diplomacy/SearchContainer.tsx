import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import DeploymacyApiFactory from "@/service/frontend/DiplomacyApiFactory";
import { ICountryListResponse, IDeplomacyList } from "@/interfaces/deplomacy";
import { CustomTable } from "@/components/_common/table";
import { Loading } from "@/components/_common/loading/Loading";
import { ITableColumn } from "@/interfaces/table";
import usePagination from "@/hooks/usePagination";

import InfoContainer from "./detail/InfoContainer";

const StyledSearchContainer = styled.div`
  width: 100%;
  padding: 1.25rem;
  .title {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }

  .loadingBox {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .loading {
      width: 20rem;
      height: 20rem;
      font-size: 1.2rem;
    }
  }
`;

interface ISearchFilter {
  pageNo: number;
  searchword: string;
}

const SearchContainer = () => {
  const [selectedCnt, setSelectedCnt] = useState<string | undefined>(undefined);

  const [searchFilter, setSearchFilter] = useState<ISearchFilter>({
    searchword: "",
    pageNo: 1,
  });

  const { data, isError, isLoading } = useQuery<ICountryListResponse | null>({
    queryKey: ["get-deplomacy-list", JSON.stringify(searchFilter)],
    queryFn: async () => {
      const query = {
        pageNo: `${searchFilter.pageNo}`,
      };
      const res = await DeploymacyApiFactory.getDeplomacyList(query);
      const data: {
        response: {
          body: ICountryListResponse;
          header: { resultCode: string; resultMsg: "" };
        };
      } = await res.json();
      console.log("data", data);
      if (res.status === 200) {
        return data?.response.body;
      }
      return null;
    },
  });

  const tableColumn: ITableColumn<IDeplomacyList>[] = [
    { access: "country_nm", header: "Name", width: "35%" },
    { access: "country_eng_nm", header: "English Name", width: "35%" },
    { access: "country_iso_alp2", header: "ISO Code", width: "20%" },
  ];

  const { pageIndexArray } = usePagination({
    totalDataCount: data?.totalCount,
    currentIndex: searchFilter.pageNo,
  });

  return (
    <StyledSearchContainer>
      {!isError && data && pageIndexArray && (
        <div className="container">
          <h2 className="title">Country Information</h2>

          <CustomTable
            data={data.items.item}
            addIdx
            columns={tableColumn}
            pagination={{
              currentIndex: searchFilter.pageNo,
              totalDataCount: data.totalCount,
              onClickIndex: (num) =>
                setSearchFilter({ ...searchFilter, pageNo: num }),
            }}
            handleRowClick={(dt) => {
              setSelectedCnt(dt.country_iso_alp2);
            }}
          />
        </div>
      )}
      {isLoading && (
        <div className="loadingBox">
          <div className="loading">
            <Loading />
          </div>
        </div>
      )}
      {selectedCnt && (
        <InfoContainer
          country={selectedCnt}
          handleClick={() => setSelectedCnt(undefined)}
        />
      )}
    </StyledSearchContainer>
  );
};

export default SearchContainer;
