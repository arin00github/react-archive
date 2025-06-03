"use client";

import { Stack } from "@mui/material";
import styled from "styled-components";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";

import { ChartType } from ".";

const StyledChartTypeBox = styled.div`
  width: 6rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid;
  border-radius: 0.5rem;

  &.selected {
    background-color: ${({ theme }) => theme.custom.color.primary};
    color: white;
  }
`;

const chartTypeArray: ChartType[] = ["bar", "line", "pie"];

interface IChartSelector {
  selectedType: ChartType;
  handleChange: (val: ChartType) => void;
}

const ChartSelector = (props: IChartSelector) => {
  const { selectedType, handleChange } = props;

  return (
    <Stack direction={"column"} spacing={2}>
      {chartTypeArray.map((chart) => {
        return (
          <StyledChartTypeBox
            key={chart}
            onClick={() => handleChange(chart)}
            className={selectedType === chart ? "selected" : ""}
          >
            <div>
              {chart === "bar" && <BarChartIcon />}
              {chart === "line" && <TimelineIcon />}
              {chart === "pie" && <DonutLargeIcon />}
            </div>
            <div>{chart}</div>
          </StyledChartTypeBox>
        );
      })}
    </Stack>
  );
};

export default ChartSelector;
