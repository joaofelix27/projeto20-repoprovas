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
const prisma_1 = __importDefault(require("../src/db/prisma "));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma_1.default.terms.upsert({
            where: { id: 1 },
            update: {},
            create: { number: 1 }
        });
        yield prisma_1.default.terms.upsert({
            where: { id: 2 },
            update: {},
            create: { number: 2 }
        });
        yield prisma_1.default.terms.upsert({
            where: { id: 3 },
            update: {},
            create: { number: 3 }
        });
        yield prisma_1.default.terms.upsert({
            where: { id: 4 },
            update: {},
            create: { number: 4 }
        });
        yield prisma_1.default.terms.upsert({
            where: { id: 5 },
            update: {},
            create: { number: 5 }
        });
        yield prisma_1.default.terms.upsert({
            where: { id: 6 },
            update: {},
            create: { number: 6 }
        });
        yield prisma_1.default.categories.upsert({
            where: { id: 1 },
            update: {},
            create: { name: "Projeto" }
        });
        yield prisma_1.default.categories.upsert({
            where: { id: 2 },
            update: {},
            create: { name: "Prática" }
        });
        yield prisma_1.default.categories.upsert({
            where: { id: 3 },
            update: {},
            create: { name: "Recuperação" }
        });
        yield prisma_1.default.teachers.upsert({
            where: { id: 1 },
            update: {},
            create: { name: "Diego Pinho" }
        });
        yield prisma_1.default.teachers.upsert({
            where: { id: 2 },
            update: {},
            create: { name: "Bruna Hamori" }
        });
        yield prisma_1.default.disciplines.upsert({
            where: { id: 1 },
            update: {},
            create: { name: "HTML e CSS", termId: 1 }
        });
        yield prisma_1.default.disciplines.upsert({
            where: { id: 2 },
            update: {},
            create: { name: "Javascript", termId: 2 }
        });
        yield prisma_1.default.disciplines.upsert({
            where: { id: 3 },
            update: {},
            create: { name: "React", termId: 3 }
        });
        yield prisma_1.default.disciplines.upsert({
            where: { id: 4 },
            update: {},
            create: { name: "Humildade", termId: 1 }
        });
        yield prisma_1.default.disciplines.upsert({
            where: { id: 5 },
            update: {},
            create: { name: "Planejamento", termId: 2 }
        });
        yield prisma_1.default.disciplines.upsert({
            where: { id: 6 },
            update: {},
            create: { name: "Autoconfiança", termId: 3 }
        });
        yield prisma_1.default.teachersDisciplines.upsert({
            where: { id: 1 },
            update: {},
            create: { teacherId: 1, disciplineId: 1 }
        });
        yield prisma_1.default.teachersDisciplines.upsert({
            where: { id: 2 },
            update: {},
            create: { teacherId: 1, disciplineId: 2 }
        });
        yield prisma_1.default.teachersDisciplines.upsert({
            where: { id: 3 },
            update: {},
            create: { teacherId: 1, disciplineId: 3 }
        });
        yield prisma_1.default.teachersDisciplines.upsert({
            where: { id: 4 },
            update: {},
            create: { teacherId: 2, disciplineId: 4 }
        });
        yield prisma_1.default.teachersDisciplines.upsert({
            where: { id: 5 },
            update: {},
            create: { teacherId: 2, disciplineId: 5 }
        });
        yield prisma_1.default.teachersDisciplines.upsert({
            where: { id: 6 },
            update: {},
            create: { teacherId: 2, disciplineId: 6 }
        });
    });
}
main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma_1.default.$disconnect();
});
