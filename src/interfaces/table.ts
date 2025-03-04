import { ReactNode } from "react";

export interface IOneFilter {
  iso: string;
  name: string;
}

export interface IOptions {
  numOfRows: number;
  pageNo: number;
  filter: IOneFilter | null;
}

export interface ITableColumn<T> {
  access: string;
  header: string;
  cell?: (value: T) => ReactNode;
  sortable?: boolean;
  tooltip?: boolean;
  width?: string;
}
