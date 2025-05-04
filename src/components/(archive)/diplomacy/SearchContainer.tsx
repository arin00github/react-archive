import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import DeploymacyApiFactory from "@/service/frontend/DiplomacyApiFactory";
import { ICountryListResponse, IDeplomacyList } from "@/interfaces/deplomacy";
import { CustomTable } from "@/components/_common/table";
import { ITableColumn } from "@/interfaces/table";
import usePagination from "@/hooks/usePagination";
import { useRouter } from "next/navigation";

const StyledSearchContainer = styled.div`
  padding: 1.25rem;
  .title {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }
`;

interface ISearchFilter {
  pageNo: number;
  searchword: string;
}

const SearchContainer = () => {
  const router = useRouter();

  const [searchFilter, setSearchFilter] = useState<ISearchFilter>({
    searchword: "",
    pageNo: 1,
  });

  const { data, isError } = useQuery<ICountryListResponse>({
    queryKey: ["get-deplomacy-list", JSON.stringify(searchFilter)],
    queryFn: async () => {
      const query = {
        pageNo: `${searchFilter.pageNo}`,
      };
      const res = await DeploymacyApiFactory.getDeplomacyList(query);
      if (res.status === 200) {
        return res.data.result;
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
        <div className="table-wrapper">
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
              router.push(`/diplomacy/${dt.country_iso_alp2}`);
            }}
          />
        </div>
      )}
    </StyledSearchContainer>
  );
};

export default SearchContainer;
