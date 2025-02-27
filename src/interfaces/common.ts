import { Db, MongoClient } from "mongodb";

export interface NavItem {
  label: string;
  url: string;
  key: string;
}

export interface MongoObject {
  client: MongoClient | null;
  db: Db | null;
}

export type LabelItemType = {
  label: string;
  value: string;
};
