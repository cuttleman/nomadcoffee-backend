import { ApolloServer } from "apollo-server";
import logger from "morgan";
import dotenv from "dotenv";
import schema from "./schema";

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ schema });

server.listen({ port: PORT }, () =>
  console.log(`Running server 😎 : http://localhost:${PORT}`)
);
