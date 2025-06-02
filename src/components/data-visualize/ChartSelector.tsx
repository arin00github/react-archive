"use client";

import { Stack } from "@mui/material";
import styled from "styled-components";
import { ChartType } from ".";

const StyledChartTypeBox = styled.div`
  width: 6rem;
  height: 6rem;
  padding: 2rem;
  border: 1px solid;

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
            {chart}
          </StyledChartTypeBox>
        );
      })}
    </Stack>
  );
};

export default ChartSelector;
