"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  Title,
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
import { useTheme } from "next-themes";

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
  Title,
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
  option: ChartOptonType,
  theme: string | undefined
): ChartOptions<T> {
  return {
    responsive: true,
    scales:
      chartType === "doughnut"
        ? undefined
        : {
            x: {
              grid: {
                color: theme === "dark" ? "#6a6a6a" : "#9f9f9f",
              },
              ticks: {
                color: theme === "dark" ? "#8a8a8a" : "#919191",
              },
            },
            y: {
              grid: {
                color: theme === "dark" ? "#6a6a6a" : "#9f9f9f",
              },
              ticks: {
                color: theme === "dark" ? "#8a8a8a" : "#919191",
              },
            },
          },
    plugins: {
      title: {
        display: option.title.display,
        text: option.title.text,
        color: theme === "dark" ? "#cfcfcf" : "#565656",
      },
      legend: {
        display: option.legend.display,
        position: option.legend.position,
        title: {
          color: theme === "dark" ? "#8a8a8a" : "#919191",
        },
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

  console.log("option", chartOption);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const { theme } = useTheme();

  const barOption = getChartOptions("bar", chartOption, theme);
  const lineOption = getChartOptions("line", chartOption, theme);
  const doughnutOption = getChartOptions("doughnut", chartOption, theme);

  const data = {
    labels: datasets[0].data.map((dt) => dt.name),
    datasets: datasets.map((dtset) => {
      return {
        label: dtset.label,
        data: dtset.data.map((dt) => Number(dt.value)),
        ...(chartType === "line" ? { borderColor: "#2133f6" } : {}),
        backgroundColor:
          chartType === "doughnut"
            ? ["#60c5ff", "#0e1bad", "#061c56", "#0379ab", "#5863dd", "#6904c2"]
            : "#2133f6",
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
