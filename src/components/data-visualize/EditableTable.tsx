"use client";

import { DatasetType } from "@/interfaces/chart";
import { Input } from "@mui/material";
import { ChangeEvent } from "react";
import styled from "styled-components";

const StyledEditableTable = styled.div`
  table,
  thead,
  tbody,
  tr {
    width: 100%;

    td,
    th {
      padding: 0.5rem 1rem;
      border-bottom: 1px solid ${({ theme }) => theme.custom.color.text100};
    }

    td {
      border-bottom: 1px solid ${({ theme }) => theme.custom.color.tableBorder};
    }
  }
`;

export interface IEditableTable {
  headers: string[];
  datasets: DatasetType[];
  handleChangeSets: (val: DatasetType[]) => void;
}

const EditableTable = (props: IEditableTable) => {
  const { datasets, handleChangeSets, headers } = props;

  const handleChangeCellValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    datasetIdx: number,
    column: string
  ) => {
    const newSets = datasets.map((dtset, idx) =>
      idx === datasetIdx
        ? {
            ...dtset,
            data: dtset.data.map((dt) => {
              return dt.name === column ? { ...dt, value: e.target.value } : dt;
            }),
          }
        : dtset
    );
    handleChangeSets(newSets);
  };

  const handleChangeColumnName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    column: string
  ) => {
    const newSets = datasets.map((dtset) => {
      return {
        ...dtset,
        data: dtset.data.map((dt) =>
          dt.name === column ? { ...dt, name: e.target.value } : dt
        ),
      };
    });
    handleChangeSets(newSets);
  };

  return (
    <StyledEditableTable>
      <table>
        <thead>
          <tr>
            {headers.map((header) => {
              return (
                <th key={header}>
                  <Input
                    style={{ fontWeight: "bold" }}
                    onChange={(e) => handleChangeColumnName(e, header)}
                    value={header}
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {datasets.map((dtset, dtsetIdx) => {
            return (
              <tr key={dtset.label}>
                {headers.map((col, idx) => {
                  return (
                    <td key={`${col}_${idx}`}>
                      <Input
                        style={{ textAlign: "right" }}
                        onChange={(e) =>
                          handleChangeCellValue(e, dtsetIdx, col)
                        }
                        value={dtset.data.find((dt) => dt.name === col)?.value}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </StyledEditableTable>
  );
};

export default EditableTable;
