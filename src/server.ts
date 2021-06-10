import { ApolloServer } from "apollo-server-express";
import express from "express";
import path from "path";
import logger from "morgan";
import dotenv from "dotenv";
import schema from "./schema";
import { getUser } from "./api/user/user.utils";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app: any = express();
const serverPath: string = "graphql";

app.use(logger("tiny"));
app.use("/static", express.static(path.join(`${__dirname}/uploads`)));

app.listen({ port: PORT }, () =>
  console.log(
    `Running server 😎 : http://localhost:${PORT}${server.graphqlPath}`
  )
);

const server = new ApolloServer({
  ...schema,
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    const token = req.headers.token;
    const loggedUser = await getUser(token);
    return { loggedUser };
  },
});
server.applyMiddleware({ app });

// server.start();
