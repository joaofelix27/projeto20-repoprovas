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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
function validateUser(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "");
        const secret = ((_a = (process.env.SECRET)) === null || _a === void 0 ? void 0 : _a.toString()) || "Secret";
        // Verify if the token is valid
        jsonwebtoken_1.default.verify(token, secret, function (err, decoded) {
            if (err) {
                throw { type: "unauthorized", message: "Failed to authenticate token." };
            }
            // se tudo estiver ok, salva no request para uso posterior
            res.locals.userId = decoded.id;
            res.locals.email = decoded.email;
            next();
        });
    });
}
exports.default = validateUser;
