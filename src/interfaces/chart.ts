export type ChartType = "bar" | "line" | "pie";

export type DataType = { name: string; value: string };

export type DatasetType = { label: string; data: DataType[] };

export type Position =
  | "center"
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "chartArea";

export interface ChartOptonType {
  legend: {
    display: boolean;
    position: Position;
  };
  title: {
    display: boolean;
    text: string;
  };
  tooltip: {
    display: boolean;
  };
}
