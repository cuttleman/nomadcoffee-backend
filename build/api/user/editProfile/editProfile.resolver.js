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
var api_utils_1 = require("../../api.utils");
exports.default = {
    Mutation: {
        editProfile: api_utils_1.protectedResolver(function (_, _a, _b) {
            var email = _a.email, username = _a.username, name = _a.name, location = _a.location, password = _a.password, avatar = _a.avatar;
            var loggedUser = _b.loggedUser;
            return __awaiter(void 0, void 0, void 0, function () {
                var avatarUrl, _c, _d, _e, _f, error_1;
                var _g, _h;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            avatarUrl = "";
                            _j.label = 1;
                        case 1:
                            _j.trys.push([1, 7, , 8]);
                            if (!avatar) return [3 /*break*/, 3];
                            return [4 /*yield*/, api_utils_1.localSave("avatar", loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id, avatar)];
                        case 2:
                            avatarUrl = _j.sent();
                            _j.label = 3;
                        case 3:
                            _d = (_c = client_1.default.user).update;
                            _g = {
                                where: { id: loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id }
                            };
                            _e = [{ email: email,
                                    username: username,
                                    name: name,
                                    location: location }];
                            _f = password;
                            if (!_f) return [3 /*break*/, 5];
                            _h = {};
                            return [4 /*yield*/, user_utils_1.passedHashFn(password)];
                        case 4:
                            _f = (_h.password = _j.sent(), _h);
                            _j.label = 5;
                        case 5: return [4 /*yield*/, _d.apply(_c, [(_g.data = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_f)])), (avatarUrl && { avatarUrl: avatarUrl })]),
                                    _g)])];
                        case 6:
                            _j.sent();
                            return [2 /*return*/, { result: true }];
                        case 7:
                            error_1 = _j.sent();
                            return [2 /*return*/, { result: false, error: error_1.message }];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        }),
    },
};
