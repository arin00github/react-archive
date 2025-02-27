import { MongoObject } from "@/interfaces/common";
import { Db, MongoClient } from "mongodb";

const url = process.env.MONGODB_URL;

const dbName = process.env.DB_NAME;

let cachedObject: MongoObject | null = null;

export async function connectToDatabase() {
  if (!url) {
    throw new Error("Undefined db url");
  }
  if (!dbName) {
    throw new Error("Undefined db name");
  }

  if (!cachedObject) {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    cachedObject = { client, db };
  }
  return cachedObject;
}
