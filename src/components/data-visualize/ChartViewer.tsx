"use client";

import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  Legend,
  Tooltip,
  LineController,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { DatasetType } from "@/interfaces/chart";
import { ChartType } from ".";
import styled from "styled-components";

const StyledChartWrapper = styled.div`
  width: 100%;
`;

interface IChartViewer {
  chartType: ChartType;
  headers: string[];
  datasets: DatasetType[];
}

ChartJS.register(
  Legend,
  Tooltip,
  LineElement,
  BarElement,
  LineController,
  CategoryScale,
  LinearScale
);

const ChartViewer = (props: IChartViewer) => {
  const { datasets, chartType } = props;

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        title: "Untitle",
      },
    },
  };

  const data = {
    labels: datasets[0].data.map((dt) => dt.name),
    datasets: datasets.map((dtset) => {
      return {
        label: dtset.label,
        data: dtset.data.map((dt) => Number(dt.value)),
      };
    }),
  };

  return (
    <StyledChartWrapper>
      {chartType === "bar" && <Bar data={data} options={options} />}
      {chartType === "line" && <Line data={data} options={options} />}
      {chartType === "pie" && <Doughnut data={data} options={options} />}
    </StyledChartWrapper>
  );
};

export default ChartViewer;
