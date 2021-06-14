"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_1 = require("@graphql-tools/merge");
var load_files_1 = require("@graphql-tools/load-files");
var typesArray = load_files_1.loadFilesSync(__dirname + "/api/**/*.typeDef{s,}.{ts,js}");
var resolversArray = load_files_1.loadFilesSync(__dirname + "/api/**/*.resolver{s,}.{ts,js}");
var typeDefs = merge_1.mergeTypeDefs(typesArray);
var resolvers = merge_1.mergeResolvers(resolversArray);
exports.default = { typeDefs: typeDefs, resolvers: resolvers };
