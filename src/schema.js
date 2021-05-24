import { makeExecutableSchema } from "apollo-server";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const typesArray = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const resolversArray = loadFilesSync(
  `${__dirname}/**/*.{queries,mutations}.js`
);

export default makeExecutableSchema({
  typeDefs: mergeTypeDefs(typesArray),
  resolvers: mergeResolvers(resolversArray),
});
