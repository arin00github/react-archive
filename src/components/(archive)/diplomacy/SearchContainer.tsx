import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import DeploymacyApiFactory from "@/service/frontend/DiplomacyApiFactory";
import { ICountryListResponse, IDeplomacyList } from "@/interfaces/deplomacy";
import { CustomTable } from "@/components/_common/table";
import { ITableColumn } from "@/interfaces/table";
import usePagination from "@/hooks/usePagination";

const StyledSearchContainer = styled.div`
  padding: 20px;
  .search-bar {
    width: 100%;
    margin-bottom: 24px;
  }
`;

interface ISearchFilter {
  pageNo: number;
  searchword: string;
}

const SearchContainer = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<ISearchFilter>({
    searchword: "",
    pageNo: 1,
  });

  const { data, isError } = useQuery<ICountryListResponse>({
    queryKey: ["get-deplomacy-list", JSON.stringify(searchFilter)],
    queryFn: async () => {
      const query = {
        keyword: searchFilter.searchword,
        pageNo: `${searchFilter.pageNo}`,
      };
      const res = await DeploymacyApiFactory.getDeplomacyList(query);
      if (res.status === 200) {
        return res.data.result;
      }
      return null;
    },
  });

  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const tableColumn: ITableColumn<IDeplomacyList>[] = [
    { access: "country_nm", header: "Name" },
    { access: "country_eng_nm", header: "En Name" },
    { access: "country_iso_alp2", header: "약어" },
  ];

  const { pageIndexArray } = usePagination({
    totalDataCount: data?.totalCount,
    currentIndex: searchFilter.pageNo,
  });

  return (
    <StyledSearchContainer>
      <div className="search-bar">
        <span>Search</span>{" "}
        <input type="text" onChange={handleChangeKeyword} value={keyword} />
      </div>
      {!isError && data && pageIndexArray && (
        <div className="table-wrapper">
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
          />
          {/* <Pagination
            indexArray={pageIndexArray}
            onClickIndex={(num) =>
              setSearchFilter({ ...searchFilter, pageNo: num })
            }
            totalDataLength={data?.totalCount}
            currentIndex={searchFilter.pageNo}
            perPageCount={10}
          /> */}
        </div>
      )}
    </StyledSearchContainer>
  );
};

export default SearchContainer;
