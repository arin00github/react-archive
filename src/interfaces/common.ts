import { Db, MongoClient } from "mongodb";
import { ReactNode } from "react";

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface MongoObject {
  client: MongoClient | null;
  db: Db | null;
}

export type LabelItemType = {
  label: string;
  value: string;
};

export type ChildrenWrapper = {
  children: ReactNode;
};
