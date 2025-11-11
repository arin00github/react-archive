export type ChartType = "bar" | "line" | "doughnut";

export type DataType = { name: string; value: string };

export type DatasetType = { label: string; data: DataType[] };

export type Position =
  | "center"
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "chartArea";

export type AlignOption = "right" | "center" | "left";

export interface ChartOptonType {
  legend: {
    display: boolean;
    position: Position;
  };
  title: {
    display: boolean;
    text: string;
    align: AlignOption;
  };
  tooltip: {
    enabled: boolean;
  };
}
