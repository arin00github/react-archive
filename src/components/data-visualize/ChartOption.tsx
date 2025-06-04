"use client";

import { ChartOptonType } from "@/interfaces/chart";
import {
  FormLabel,
  Input,
  MenuItem,
  Select,
  Stack,
  Switch,
} from "@mui/material";
import styled from "styled-components";

const StyledChartOptionSection = styled.div`
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 4rem;

  .sectionHeader {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }
  .section {
    width: 100%;

    .sectionPart {
      width: 100%;
      display: flex;
      gap: 1rem;
      align-items: center;
    }
  }
`;

interface IChartOption {
  chartOption: ChartOptonType;
  handleChange: (val: ChartOptonType) => void;
}

const ChartOption = (props: IChartOption) => {
  const { chartOption, handleChange } = props;

  const { legend, title, tooltip } = chartOption;
  return (
    <StyledChartOptionSection>
      <h4 className="sectionHeader">Title</h4>
      <Stack className="section" direction={"row"} spacing={3}>
        <div className="sectionPart">
          <FormLabel>display</FormLabel>
          <Switch
            checked={title.display}
            onChange={() => {
              handleChange({
                ...chartOption,
                title: { ...chartOption.title, display: !title.display },
              });
            }}
          />
        </div>
        <div className="sectionPart">
          <FormLabel>Text</FormLabel>
          <Input value={title.text} onChange={() => {}} />
        </div>
      </Stack>
      <h4 className="sectionHeader">Legend</h4>
      <Stack className="section" direction={"row"} spacing={3}>
        <div className="sectionPart">
          <FormLabel>display</FormLabel>
          <Switch
            checked={legend.display}
            onChange={() => {
              handleChange({
                ...chartOption,
                legend: { ...chartOption.legend, display: !legend.display },
              });
            }}
          />
        </div>
        <div className="sectionPart">
          <FormLabel>Position</FormLabel>
          <Select
            size="small"
            value={legend.position}
            onChange={(e) => {
              handleChange({
                ...chartOption,
                legend: { ...chartOption.legend, position: e.target.value },
              });
            }}
          >
            <MenuItem value="left">Left</MenuItem>
            <MenuItem value="right">Right</MenuItem>
            <MenuItem value="bottom">Bottom</MenuItem>
            <MenuItem value="top">Top</MenuItem>
          </Select>
        </div>
      </Stack>
      <h4 className="sectionHeader">Tooltip</h4>
      <Stack className="section" direction={"row"} spacing={1}>
        <FormLabel>display</FormLabel>
        <Switch
          checked={tooltip.display}
          onChange={() => {
            handleChange({
              ...chartOption,
              tooltip: { ...chartOption.tooltip, display: !tooltip.display },
            });
          }}
        />
      </Stack>
    </StyledChartOptionSection>
  );
};

export default ChartOption;
