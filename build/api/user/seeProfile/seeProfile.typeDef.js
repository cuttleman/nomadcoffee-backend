"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    seeProfile(id: String!): SeeProfile!\n  }\n  type SeeProfile {\n    result: Boolean!\n    error: String\n    user: User\n    seeFollowers(pageNum: Int!): Followers\n    seeFollowing(pageNum: Int!): Followers\n    totalFollowers: TotalFollowNum\n    totalFollowing: TotalFollowNum\n  }\n  type Followers {\n    users: [User]\n    totalPageNum: Int\n  }\n  type TotalFollowNum {\n    count: Int\n  }\n"], ["\n  type Query {\n    seeProfile(id: String!): SeeProfile!\n  }\n  type SeeProfile {\n    result: Boolean!\n    error: String\n    user: User\n    seeFollowers(pageNum: Int!): Followers\n    seeFollowing(pageNum: Int!): Followers\n    totalFollowers: TotalFollowNum\n    totalFollowing: TotalFollowNum\n  }\n  type Followers {\n    users: [User]\n    totalPageNum: Int\n  }\n  type TotalFollowNum {\n    count: Int\n  }\n"])));
var templateObject_1;
