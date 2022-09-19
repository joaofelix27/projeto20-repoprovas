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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers = __importStar(require("../controllers/authController"));
const genericSchemaMiddleware_1 = require("../middlewares/genericSchemaMiddleware");
const sIgnInSchema_1 = require("../schemas/authSchemas/sIgnInSchema");
const signUpSchema_1 = require("../schemas/authSchemas/signUpSchema");
const usersRouter = (0, express_1.Router)();
usersRouter.post("/sign-up", (0, genericSchemaMiddleware_1.validateSchema)(signUpSchema_1.signUpSchema), authControllers.register);
usersRouter.post("/sign-in", (0, genericSchemaMiddleware_1.validateSchema)(sIgnInSchema_1.signInSchema), authControllers.login);
usersRouter.post("/sign-in/github", authControllers.gitHubLogin);
exports.default = usersRouter;
