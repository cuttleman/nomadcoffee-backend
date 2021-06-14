"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type User {\n    id: String!\n    username: String!\n    email: String!\n    name: String\n    password: String!\n    location: String\n    avatarUrl: String\n    githubUsername: String\n    isFollowing: Boolean\n    isSelf: Boolean\n    coffeeShops: [CoffeeShop!]\n    createAt: String!\n    updateAt: String!\n  }\n"], ["\n  type User {\n    id: String!\n    username: String!\n    email: String!\n    name: String\n    password: String!\n    location: String\n    avatarUrl: String\n    githubUsername: String\n    isFollowing: Boolean\n    isSelf: Boolean\n    coffeeShops: [CoffeeShop!]\n    createAt: String!\n    updateAt: String!\n  }\n"])));
var templateObject_1;
