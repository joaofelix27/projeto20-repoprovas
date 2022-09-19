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
exports.getTestByTeachers = exports.getTestByDiscipline = exports.createTest = void 0;
const prisma_1 = __importDefault(require("../db/prisma "));
function createTest(test) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.tests.create({ data: Object.assign({}, test) });
    });
}
exports.createTest = createTest;
function getTestByDiscipline() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.terms.findMany({
            select: {
                number: true,
                disciplines: {
                    select: {
                        name: true,
                        teachersDisciplines: {
                            select: {
                                tests: { distinct: ['categoryId'],
                                    select: {
                                        categories: {
                                            select: {
                                                name: true,
                                                tests: {
                                                    select: {
                                                        id: true,
                                                        name: true,
                                                        teachersDisciplines: {
                                                            select: { teachers: { select: { name: true } } },
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    });
}
exports.getTestByDiscipline = getTestByDiscipline;
function getTestByTeachers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.teachers.findMany({
            where: {},
            distinct: ["name"],
            select: {
                name: true,
                teachersDisciplines: {
                    select: {
                        disciplines: { select: { name: true } },
                        tests: {
                            select: {
                                id: true,
                                name: true,
                                pdfUrl: true,
                                categories: { select: { name: true } },
                            },
                            orderBy: { categoryId: "desc" },
                        },
                    },
                },
            },
        });
    });
}
exports.getTestByTeachers = getTestByTeachers;
