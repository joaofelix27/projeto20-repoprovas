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
exports.getTestByTeachers = exports.getTestByDisciplines = exports.createTest = void 0;
const categoriesRepository_1 = require("../repositories/categoriesRepository");
const disciplinesRepository_1 = require("../repositories/disciplinesRepository");
const testsRepository = __importStar(require("../repositories/testsRepository"));
const authRepository = __importStar(require("../repositories/authRepository"));
const dotenv_1 = __importDefault(require("dotenv"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dayjs_1 = __importDefault(require("dayjs"));
dotenv_1.default.config();
const createTest = (testData) => __awaiter(void 0, void 0, void 0, function* () {
    const year = (0, dayjs_1.default)().format("YYYY");
    const category = yield (0, categoriesRepository_1.getCategoryById)(testData.categoryId);
    const API_KEY = process.env.EMAIL_API_KEY || "Erro";
    mail_1.default.setApiKey(API_KEY);
    if (!category) {
        throw { type: "not_found", message: "This category id does not exists" };
    }
    const discipline = yield (0, disciplinesRepository_1.getDisciplineById)(testData.teacherDisciplineId);
    if (!discipline) {
        throw { type: "not_found", message: "This teacher discipline id does not exists" };
    }
    const createTest = yield testsRepository.createTest(testData);
    const findUsers = yield authRepository.findAllUsers();
    findUsers.forEach(value => {
        const emailSend = {
            to: value.email,
            from: 'joao_felix_@hotmail.com',
            subject: 'Prova',
            text: "Eae",
            html: `<h1>A seguinte prova foi adicionada: ${createTest.name} ${category.name} ${year} - ${createTest.pdfUrl} (${discipline.name})</h1>`
        };
        mail_1.default.send(emailSend).then(response => console.log("Emails Enviados")).catch((error) => console.log(error.message));
    });
    return createTest;
});
exports.createTest = createTest;
const getTestByDisciplines = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield testsRepository.getTestByDiscipline();
});
exports.getTestByDisciplines = getTestByDisciplines;
const getTestByTeachers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield testsRepository.getTestByTeachers();
    return result;
});
exports.getTestByTeachers = getTestByTeachers;
