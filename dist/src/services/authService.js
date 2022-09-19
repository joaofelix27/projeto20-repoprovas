"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitHubLogin = exports.login = exports.register = void 0;
const authRepository = __importStar(require("../repositories/authRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const alreadyExists = yield authRepository.findUnique(email);
    if (alreadyExists) {
        throw { type: "conflict", message: "It was not possible to register" };
    }
    const encryptedPassword = bcrypt_1.default.hashSync(password, 10);
    return yield authRepository.createRegister({ email, password: encryptedPassword });
});
exports.register = register;
const login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const emailExists = yield authRepository.findUnique(email);
    if (!emailExists) {
        throw { type: "unauthorized", message: "It was not possible to login" };
    }
    const verifyPassword = bcrypt_1.default.compareSync(password, emailExists === null || emailExists === void 0 ? void 0 : emailExists.password);
    if (!verifyPassword)
        throw { type: "unauthorized", message: "It was not possible to login" };
    const returnToken = Object.assign({}, emailExists);
    returnToken === null || returnToken === void 0 ? true : delete returnToken.password;
    const secret = ((_a = (process.env.SECRET)) === null || _a === void 0 ? void 0 : _a.toString()) || "Secret";
    const token = jsonwebtoken_1.default.sign(returnToken, secret, {
        expiresIn: "30d"
    });
    return token;
});
exports.login = login;
const gitHubLogin = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const emailExists = yield authRepository.findUnique(email);
    if (!emailExists) {
        yield authRepository.createRegisterFromGitHub(email);
    }
    const returnToken = Object.assign({}, emailExists);
    returnToken === null || returnToken === void 0 ? true : delete returnToken.password;
    const secret = ((_b = (process.env.SECRET)) === null || _b === void 0 ? void 0 : _b.toString()) || "Secret";
    const token = jsonwebtoken_1.default.sign(returnToken, secret, {
        expiresIn: "30d"
    });
    return token;
});
exports.gitHubLogin = gitHubLogin;
