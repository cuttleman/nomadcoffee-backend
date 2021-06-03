"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __importDefault(require("../../../client"));
var user_utils_1 = require("../user.utils");
exports.default = {
    Query: {
        seeProfile: user_utils_1.protectedResolver(function (_, _a) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () {
                var user_1, TAKE_NUM_1, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4, client_1.default.user.findUnique({
                                    where: { id: id },
                                })];
                        case 1:
                            user_1 = _b.sent();
                            if (user_1) {
                                TAKE_NUM_1 = 5;
                                return [2, {
                                        result: true,
                                        user: user_1,
                                        seeFollowers: function (_a) {
                                            var pageNum = _a.pageNum;
                                            return (__assign(__assign({}, user_1), { pageNum: pageNum, takeNum: TAKE_NUM_1 }));
                                        },
                                        seeFollowing: function (_a) {
                                            var pageNum = _a.pageNum;
                                            return (__assign(__assign({}, user_1), { pageNum: pageNum, takeNum: TAKE_NUM_1 }));
                                        },
                                        totalFollowers: __assign({}, user_1),
                                        totalFollowing: __assign({}, user_1),
                                    }];
                            }
                            else {
                                throw Error("Not Found specific User from username");
                            }
                            return [3, 3];
                        case 2:
                            error_1 = _b.sent();
                            return [2, { result: false, error: error_1.message }];
                        case 3: return [2];
                    }
                });
            });
        }),
    },
    Followers: {
        totalPageNum: function (parent, _, __, info) { return __awaiter(void 0, void 0, void 0, function () {
            var id, takeNum, from, totalNum, totalPageNum;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = parent.id, takeNum = parent.takeNum;
                        from = info.path.prev.key;
                        return [4, client_1.default.user.count({
                                where: (_a = {},
                                    _a[from === "seeFollowers" ? "following" : "followers"] = {
                                        some: { id: id },
                                    },
                                    _a),
                            })];
                    case 1:
                        totalNum = _b.sent();
                        totalPageNum = Math.ceil(totalNum / takeNum);
                        return [2, totalPageNum];
                }
            });
        }); },
        users: function (parent, _, __, info) { return __awaiter(void 0, void 0, void 0, function () {
            var id, pageNum, takeNum, from, followUsers, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = parent.id, pageNum = parent.pageNum, takeNum = parent.takeNum;
                        from = info.path.prev.key;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, client_1.default.user.findMany({
                                where: (_a = {},
                                    _a[from === "seeFollowers" ? "following" : "followers"] = {
                                        some: { id: id },
                                    },
                                    _a),
                                skip: (pageNum - 1) * takeNum,
                                take: takeNum,
                            })];
                    case 2:
                        followUsers = _b.sent();
                        return [2, followUsers];
                    case 3:
                        error_2 = _b.sent();
                        throw Error("Error: seeFollowers resolver in User computed field");
                    case 4: return [2];
                }
            });
        }); },
    },
    TotalFollowNum: {
        count: function (parent, _, __, info) { return __awaiter(void 0, void 0, void 0, function () {
            var id, from;
            var _a;
            return __generator(this, function (_b) {
                id = parent.id;
                from = info.path.prev.key;
                return [2, client_1.default.user.count({
                        where: (_a = {},
                            _a[from === "totalFollowers" ? "following" : "followers"] = {
                                some: { id: id },
                            },
                            _a),
                    })];
            });
        }); },
    },
};
