import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const user = "mistogan";
const userPassword = "Z5QgnCBmhFKIvSz6";
const cluster = "cluster0.qpbvv";

const databaseName = "test_listings";
const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);

  const db = client.db("main");

  return {
    listings: db.collection("test_listings"),
  };
};
