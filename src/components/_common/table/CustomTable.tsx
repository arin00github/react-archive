import { IOptions, ITableColumn } from "@/interfaces/table";
import React from "react";

import styled from "styled-components";

export interface ICustomTable<T> {
  aria_title?: string;
  data?: T[];
  handleRowClick?: (value: T) => void;
  handleSort?: (columnId: string, sortValue: boolean | undefined) => void;
  columns: ITableColumn<T>[];
  options?: IOptions;
  minH?: string;
  addIdx?: boolean;
}

const StyledTable = styled.table`
  width: 100%;
`;

const StylecTh = styled.th`
  text-align: center;
  line-height: 44px;
  height: 44px;
  border-bottom: 1px solid #dbdde1;
  //min-width: 100px;
`;

const StyledTr = styled.tr`
  width: 100%;
  &:hover {
    background-color: #ededed;
    cursor: pointer;
  }
`;

const StylecTd = styled.td`
  text-align: center;
  line-height: 38px;
  height: 38px;
  font-size: 14px;
  border-bottom: 1px solid #dbdde1;
  //min-width: 100px;
`;

const CustomTable = <T extends object>({
  data,
  handleRowClick,
  addIdx,
  columns,
  aria_title,
}: ICustomTable<T>) => {
  const exceptedData = ["id", "idx"];
  return (
    <div>
      {data && data[0] && (
        <StyledTable>
          <colgroup>
            {addIdx && <col style={{ width: "10%" }}></col>}
            {columns.map((colValue, idx) => {
              if (colValue.width) {
                return (
                  <col
                    key={`${aria_title}_col_${idx}`}
                    style={{ width: colValue.width }}
                  />
                );
              }
            })}
          </colgroup>
          <thead>
            <StyledTr>
              {addIdx && <StylecTh className="text-center"></StylecTh>}
              {columns.map((col, idx) => {
                if (!exceptedData.includes(col.access)) {
                  return (
                    <StylecTh key={`thead-col-${idx}`}>{col.header}</StylecTh>
                  );
                }
              })}
            </StyledTr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              return (
                <StyledTr
                  key={`row_${index}`}
                  onClick={() => handleRowClick && handleRowClick(row)}
                >
                  {addIdx && <StylecTd>{index + 1}</StylecTd>}
                  {columns &&
                    columns.map((col, idx) => {
                      const findItem = Object.entries(row).find(
                        (it) => it[0] === col.access
                      );
                      if (findItem && !exceptedData.includes(col.access)) {
                        return (
                          <StylecTd
                            key={`cell_${index}_${idx}`}
                            style={{ width: `${col.width}%` }}
                          >
                            {col.cell ? col.cell(row) : findItem[1]}
                          </StylecTd>
                        );
                      }
                    })}
                </StyledTr>
              );
            })}
          </tbody>
        </StyledTable>
      )}
    </div>
  );
};

const CustemTableSet = { CustomTable };

export default CustemTableSet;
