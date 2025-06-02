"use client";

import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";

import { BasicStyleLayout } from "../_common/style/BasicLayout";
import ChartViewer from "./ChartViewer";
import EditableTable from "./EditableTable";
import ChartSelector from "./ChartSelector";
import { DatasetType } from "@/interfaces/chart";

const StyledContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
`;

export type ChartType = "bar" | "line" | "pie";

const initialRowData = [
  {
    label: "dataset1",
    data: [
      { name: "column1", value: "10" },
      { name: "column2", value: "45" },
      { name: "column3", value: "20" },
      { name: "column4", value: "32" },
      { name: "column5", value: "20" },
    ],
  },
];

const DataVisualizeContainer = () => {
  const [chartType, setChartType] = useState<ChartType>("bar");
  // const [headers, setHeaders] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<DatasetType[]>(initialRowData);

  const headers = useMemo(
    () => datasets[0].data.map((dt) => dt.name),
    [datasets]
  );

  const handleChangeChartType = (val: ChartType) => {
    setChartType(val);
  };

  const handleChangeData = (val: DatasetType[]) => {
    setDatasets(val);
  };

  return (
    <BasicStyleLayout>
      <StyledContainer>
        <Typography>Chart Viewer</Typography>
        <Box marginTop={"2.2rem"} display={"flex"} gap={"1.2rem"} width="100%">
          <ChartSelector
            selectedType={chartType}
            handleChange={handleChangeChartType}
          />
          <ChartViewer
            chartType={chartType}
            headers={headers}
            datasets={datasets}
          />
        </Box>
        <Typography marginTop={"4rem"}>Chart Table</Typography>
        <Box marginTop={"2rem"}>
          <EditableTable
            headers={headers}
            datasets={datasets}
            handleChangeSets={handleChangeData}
          />
        </Box>
        <Typography marginTop={"4rem"}>Chart Options</Typography>
      </StyledContainer>
    </BasicStyleLayout>
  );
};

export default DataVisualizeContainer;
