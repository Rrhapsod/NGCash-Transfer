"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
exports.UsersController = void 0;
var Error_1 = require("../utils/Error");
var prisma_1 = require("../lib/prisma");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var hash = bcryptjs_1["default"].hash;
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, userExists, hashedPassword;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, username = _a.username, password = _a.password;
                        if (String(username).length < 3) {
                            throw new Error_1.Error("O nome de usuário deve ter ao menos 3 caracteres");
                        }
                        if (String(password).length < 8 ||
                            !/[0-9]/.test(password) ||
                            !/[A-Z]/.test(password)) {
                            throw new Error_1.Error("A senha deve ter ao menos 8 caracteres, um número e uma letra maiúscula.");
                        }
                        return [4 /*yield*/, prisma_1.prisma.users.findUnique({
                                where: {
                                    username: username
                                }
                            })];
                    case 1:
                        userExists = _b.sent();
                        if (userExists) {
                            throw new Error_1.Error("Este nome de usuário já existe, informe outro.");
                        }
                        return [4 /*yield*/, hash(password, 8)];
                    case 2:
                        hashedPassword = _b.sent();
                        return [4 /*yield*/, prisma_1.prisma.accounts.create({
                                data: {
                                    balance: 100.0,
                                    Users: {
                                        create: {
                                            username: username,
                                            password: hashedPassword
                                        }
                                    }
                                }
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, response.status(201).json()];
                }
            });
        });
    };
    UsersController.prototype.search = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, searchUsername, searchUserAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.params.username;
                        return [4 /*yield*/, prisma_1.prisma.users.findUnique({
                                where: {
                                    username: username
                                }
                            })];
                    case 1:
                        searchUsername = _a.sent();
                        if (!searchUsername) {
                            throw new Error_1.Error("Este usuário não existe!");
                        }
                        return [4 /*yield*/, prisma_1.prisma.accounts.findUnique({
                                where: {
                                    id: searchUsername === null || searchUsername === void 0 ? void 0 : searchUsername.id
                                },
                                include: {
                                    Users: {
                                        select: {
                                            id: true
                                        }
                                    }
                                }
                            })];
                    case 2:
                        searchUserAccount = _a.sent();
                        if (!searchUserAccount) {
                            throw new Error_1.Error("Este usuário não existe!");
                        }
                        return [2 /*return*/, response.json(searchUserAccount.id)];
                }
            });
        });
    };
    return UsersController;
}());
exports.UsersController = UsersController;
//# sourceMappingURL=UsersController.js.map