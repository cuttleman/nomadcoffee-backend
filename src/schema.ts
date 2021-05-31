import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const typesArray = loadFilesSync(`${__dirname}/api/**/*.typeDef{s,}.{ts,js}`);
const resolversArray = loadFilesSync(
  `${__dirname}/api/**/*.resolver{s,}.{ts,js}`
);

const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);

export default { typeDefs, resolvers };
