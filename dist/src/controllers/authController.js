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
const authService = __importStar(require("../services/authService"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const query_string_1 = __importDefault(require("query-string"));
dotenv_1.default.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const registerData = req.body;
    const { email, password } = registerData;
    const result = yield authService.register({ email, password });
    if (result) {
        return res.sendStatus(201);
    }
    else {
        throw { type: "error", message: "It was not possible to register" };
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.body;
    const { email, password } = loginData;
    const result = yield authService.login({ email, password });
    if (result) {
        return res.status(200).send(result);
    }
    else {
        throw { type: "error", message: "It was not possible to login" };
    }
});
exports.login = login;
const gitHubLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const token = yield getGitHubToken(code);
    const user = yield fetchUser(token);
    const result = yield authService.gitHubLogin(user);
    if (result) {
        return res.status(200).send(result);
    }
    else {
        throw { type: "error", message: "It was not possible to login" };
    }
});
exports.gitHubLogin = gitHubLogin;
function getGitHubToken(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const github_url = 'https://github.com/login/oauth/access_token';
        const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
        const body = {
            code,
            grant_type: 'authorization_code',
            redirect_uri: REDIRECT_URL,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        };
        const { data } = yield axios_1.default.post(github_url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const parsedData = query_string_1.default.parse(data);
        return parsedData.access_token;
    });
}
function fetchUser(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get("http://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    });
}
