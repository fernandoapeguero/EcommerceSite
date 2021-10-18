import express from "express";

import { typeDefs, resolvers } from "./graphql";
import { ApolloServer } from "apollo-server-express";

const port = 9000;
const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

(async function () {
  await server.start();
  server.applyMiddleware({ app, path: "/api" });
})();

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
