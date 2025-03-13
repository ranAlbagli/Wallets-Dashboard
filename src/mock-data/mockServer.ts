import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { typeDefs } from "../graphql/typeDefs.js";
import { resolvers } from "../graphql/resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

const startServer = async () => {
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(4000, () => {
    console.log(`🚀 Mock GraphQL Server running at http://localhost:4000/graphql`);
  });
};

startServer();
