"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  Legend,
  Tooltip,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  ChartOptions,
} from "chart.js";
import styled from "styled-components";
import { Bar, Line, Doughnut } from "react-chartjs-2";

import { ChartOptonType, ChartType, DatasetType } from "@/interfaces/chart";

const StyledChartWrapper = styled.div`
  width: 100%;
  height: 45vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IChartViewer {
  chartType: ChartType;
  headers: string[];
  datasets: DatasetType[];
  chartOption: ChartOptonType;
}

ChartJS.register(
  Legend,
  Tooltip,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  LineController,
  CategoryScale,
  LinearScale
);

export function getChartOptions<T extends ChartType>(
  chartType: T,
  option: ChartOptonType
): ChartOptions<T> {
  return {
    responsive: true,
    plugins: {
      title: {
        display: option.title.display,
        text: option.title.text,
      },
      legend: {
        display: option.legend.display,
        position: option.legend.position,
      },
      tooltip: {
        enabled: option.tooltip.enabled,
        mode: "index",
      },
    },
  } as ChartOptions<T>;
}

const ChartViewer = (props: IChartViewer) => {
  const { datasets, chartType, chartOption } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const barOption = getChartOptions("bar", chartOption);
  const lineOption = getChartOptions("line", chartOption);
  const doughnutOption = getChartOptions("doughnut", chartOption);

  const data = {
    labels: datasets[0].data.map((dt) => dt.name),
    datasets: datasets.map((dtset) => {
      return {
        label: dtset.label,
        data: dtset.data.map((dt) => Number(dt.value)),
        backgroundColor:
          chartType === "doughnut"
            ? ["#0e1bad", "#60c5ff", "#061c56", "#0379ab", "#5863dd", "#6904c2"]
            : "#0e1bad",
      };
    }),
  };

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]; // 첫 번째 resize 이벤트 정보
      const { width, height } = entry.contentRect; // DOM 요소의 크기 정보
      setSize({ width, height }); // 상태 갱신
    });

    if (containerRef.current) {
      observer.observe(containerRef.current); // 감시 시작
    }

    return () => observer.disconnect(); // 언마운트 시 해제
  }, []);

  return (
    <StyledChartWrapper ref={containerRef}>
      <div
        style={{
          width: size.width,
          height: size.height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {chartType === "bar" && <Bar data={data} options={barOption} />}
        {chartType === "line" && <Line data={data} options={lineOption} />}
        {chartType === "doughnut" && (
          <Doughnut data={data} options={doughnutOption} />
        )}
      </div>
    </StyledChartWrapper>
  );
};

export default ChartViewer;
