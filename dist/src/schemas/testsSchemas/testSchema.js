"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.testSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    pdfUrl: joi_1.default.string().uri().required(),
    categoryId: joi_1.default.number().strict().min(1).required(),
    teacherDisciplineId: joi_1.default.number().strict().min(1).required(),
});
