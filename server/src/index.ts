require("dotenv").config();

import express, { Application } from "express";
import { typeDefs, resolvers } from "./graphql";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });

  (async function () {
    await server.start();
    server.applyMiddleware({ app, path: "/api" });
  })();

  app.listen(process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT}`);
  });

  const listings = await db.listings.find({}).toArray();
  console.log(listings);
};

mount(express());
