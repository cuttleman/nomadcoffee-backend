"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __importDefault(require("../../../client"));
exports.default = {
    Query: {
        allUsers: function () { return client_1.default.user.findMany(); },
    },
};
