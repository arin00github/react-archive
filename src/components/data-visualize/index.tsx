"use client";

import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";

import { ChartOptonType, ChartType, DatasetType } from "@/interfaces/chart";

import { BasicStyleLayout } from "../_common/style/BasicLayout";
import ChartViewer from "./ChartViewer";
import EditableTable from "./EditableTable";
import ChartSelector from "./ChartSelector";
import ChartOption from "./ChartOption";
import SectionHeader from "../_common/style/SectionHeader";

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  /* 전체 스크롤바 */
  &::-webkit-scrollbar {
    width: 8px; /* 세로 스크롤 */
    height: 8px; /* 가로 스크롤 */
  }

  /* 스크롤바 트랙 (배경) */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* 스크롤 핸들(움직이는 부분) */
  &::-webkit-scrollbar-thumb {
    background: #dcdcdc;
    border-radius: 4px;
  }

  /* 마우스 hover 시 */
  &::-webkit-scrollbar-thumb:hover {
    background: #c3c3c3;
  }

  .container {
    margin: 0 auto;
    width: 100%;
    max-width: 800px;

    .wrapper {
      width: calc(100% - 20px);
      padding-right: 20px;
    }
  }
`;

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
  const [datasets, setDatasets] = useState<DatasetType[]>(initialRowData);
  const [chartOption, setChartOption] = useState<ChartOptonType>({
    legend: {
      display: true,
      position: "bottom",
    },
    title: {
      display: false,
      text: "",
    },
    tooltip: {
      display: false,
    },
  });

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

  const handleChangeOption = (val: ChartOptonType) => {
    setChartOption(val);
  };

  return (
    <BasicStyleLayout>
      <StyledContainer>
        <div className="container">
          <div className="wrapper">
            <SectionHeader>Chart Viewer</SectionHeader>
            <Box
              marginTop={"2.2rem"}
              display={"flex"}
              gap={"1.8rem"}
              width="100%"
            >
              <ChartSelector
                selectedType={chartType}
                handleChange={handleChangeChartType}
              />
              <ChartViewer
                chartType={chartType}
                headers={headers}
                datasets={datasets}
                chartOption={chartOption}
              />
            </Box>
            <SectionHeader>Chart Table</SectionHeader>
            <Box marginTop={"2rem"}>
              <EditableTable
                headers={headers}
                datasets={datasets}
                handleChangeSets={handleChangeData}
              />
            </Box>
            <SectionHeader>Chart Options</SectionHeader>
            <ChartOption
              chartOption={chartOption}
              handleChange={handleChangeOption}
            />
          </div>
        </div>
      </StyledContainer>
    </BasicStyleLayout>
  );
};

export default DataVisualizeContainer;
