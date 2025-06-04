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

const ChartViewer = (props: IChartViewer) => {
  const { datasets, chartType, chartOption } = props;

  const { title, legend } = chartOption;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: title.display,
        text: title.text,
      },
      legend: {
        display: legend.display,
        position: legend.position,
      },
      // tooltip: {
      //   display: tooltip.display,
      // },
    },
  };

  const data = {
    labels: datasets[0].data.map((dt) => dt.name),
    datasets: datasets.map((dtset) => {
      return {
        label: dtset.label,
        data: dtset.data.map((dt) => Number(dt.value)),
        backgroundColor:
          chartType === "pie"
            ? ["#eb4034", "#eb9634", "#298f04", "#0379ab", "#0e1bad", "#6904c2"]
            : "#eb4034",
      };
    }),
  };

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]; // 첫 번째 resize 이벤트 정보
      console.log("entry", entry);
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
        {chartType === "bar" && <Bar data={data} options={options} />}
        {chartType === "line" && <Line data={data} options={options} />}
        {chartType === "pie" && <Doughnut data={data} options={options} />}
      </div>
    </StyledChartWrapper>
  );
};

export default ChartViewer;
