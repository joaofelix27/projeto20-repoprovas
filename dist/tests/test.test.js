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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../src/app"));
const supertest_1 = __importDefault(require("supertest"));
const prisma_1 = __importDefault(require("../src/db/prisma "));
const userFactory_1 = require("./factories/userFactory");
const testFactory_1 = require("./factories/testFactory");
const agent = (0, supertest_1.default)(app_1.default);
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$executeRaw `TRUNCATE TABLE "tests"`;
}));
describe('POST /tests/create', () => {
    it('Expected to return 422 when sending a test without name', () => __awaiter(void 0, void 0, void 0, function* () {
        const _a = (0, testFactory_1.testFactory)(), { name } = _a, incorrectSchemaTest = __rest(_a, ["name"]);
        const result = yield agent.post('/tests/create').send(incorrectSchemaTest);
        expect(result.status).toBe(422);
    }));
    it('Expected to return 422 when sending a test without pdfUrl', () => __awaiter(void 0, void 0, void 0, function* () {
        const _b = (0, testFactory_1.testFactory)(), { pdfUrl } = _b, incorrectSchemaTest = __rest(_b, ["pdfUrl"]);
        const result = yield agent.post('/tests/create').send(incorrectSchemaTest);
        expect(result.status).toBe(422);
    }));
    it('Expected to return 422 when sending a test without categoryId', () => __awaiter(void 0, void 0, void 0, function* () {
        const _c = (0, testFactory_1.testFactory)(), { categoryId } = _c, incorrectSchemaTest = __rest(_c, ["categoryId"]);
        const result = yield agent.post('/tests/create').send(incorrectSchemaTest);
        expect(result.status).toBe(422);
    }));
    it('Expected to return 422 when sending a test without teacherDisciplineId', () => __awaiter(void 0, void 0, void 0, function* () {
        const _d = (0, testFactory_1.testFactory)(), { teacherDisciplineId } = _d, incorrectSchemaTest = __rest(_d, ["teacherDisciplineId"]);
        const result = yield agent.post('/tests/create').send(incorrectSchemaTest);
        expect(result.status).toBe(422);
    }));
    it('Expected to return 422 when sending a test with the wrong schema types', () => __awaiter(void 0, void 0, void 0, function* () {
        const incorrectSchemaTest = (0, testFactory_1.testFactory)();
        const result = yield agent.post('/tests/create').send(Object.assign(Object.assign({}, incorrectSchemaTest), { categoryId: "2", teacherDisciplineId: "1" }));
        expect(result.status).toBe(422);
    }));
    it('Expected to return 401 when not sending an authorization', () => __awaiter(void 0, void 0, void 0, function* () {
        const correctSchemaTest = (0, testFactory_1.testFactory)();
        const result = yield agent.post('/tests/create').send(correctSchemaTest);
        expect(result.status).toBe(401);
    }));
    it('Expected to return 401 when not sending a valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const correctSchemaTest = (0, testFactory_1.testFactory)();
        const token = '';
        const result = yield agent.post('/tests/create').send(correctSchemaTest).set({ Authorization: `Bearer ${token}` });
        expect(result.status).toBe(401);
    }));
    it('Expected to return 404 when sending an incorrect categoryId', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, userFactory_1.userFactory)();
        yield (0, supertest_1.default)(app_1.default).post('/sign-up').send(user);
        const resultLogin = yield agent.post('/sign-in').send({ email: user.email, password: user.password });
        const correctSchemaTest = (0, testFactory_1.testFactory)();
        const result = yield agent.post('/tests/create').send(Object.assign(Object.assign({}, correctSchemaTest), { teacherDisciplineId: 1 })).set({ Authorization: `Bearer ${resultLogin.text}` });
        expect(result.status).toBe(404);
    }));
    it('Expected to return 404 when sending an incorrect teacherDisciplineId', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, userFactory_1.userFactory)();
        yield (0, supertest_1.default)(app_1.default).post('/sign-up').send(user);
        const resultLogin = yield agent.post('/sign-in').send({ email: user.email, password: user.password });
        const correctSchemaTest = (0, testFactory_1.testFactory)();
        const result = yield agent.post('/tests/create').send(Object.assign(Object.assign({}, correctSchemaTest), { categoryId: 1 })).set({ Authorization: `Bearer ${resultLogin.text}` });
        expect(result.status).toBe(404);
    }));
    it('Expected to return 201 when all the data needed is correct and the test is created', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, userFactory_1.userFactory)();
        yield (0, supertest_1.default)(app_1.default).post('/sign-up').send(user);
        const resultLogin = yield agent.post('/sign-in').send({ email: user.email, password: user.password });
        const correctSchemaTest = (0, testFactory_1.testFactory)();
        const result = yield agent.post('/tests/create').send(Object.assign(Object.assign({}, correctSchemaTest), { categoryId: 1, teacherDisciplineId: 1 })).set({ Authorization: `Bearer ${resultLogin.text}` });
        const created = yield prisma_1.default.tests.findFirst({
            where: {
                name: correctSchemaTest.name
            }
        });
        expect(result.status).toBe(201);
        expect(created).not.toBeNull();
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$executeRaw `TRUNCATE TABLE "users"`;
    yield prisma_1.default.$disconnect();
}));
// it('Expected to return 201 when all the data needed is correct and the test is created', async () => {
//     const user = userFactory()
//     await supertest(app).post('/sign-up').send({email:"joaofelix27@gmail.com",password:"12345678910",confirmedPassword:"12345678910"})
//     const resultLogin = await agent.post('/sign-in').send({email:"joaofelix27@gmail.com",password:"12345678910"})
//     console.log("TESTE",resultLogin.text)
//     const correctSchemaTest = testFactory()
//     const result = await agent.post('/tests/create').send({...correctSchemaTest,categoryId:1,teacherDisciplineId:1}).set({Authorization:`Bearer ${resultLogin.text}`})
//     const created =await prisma.tests.findFirst({
//         where: {
//           name:correctSchemaTest.name
//         }
//       });
//     expect(result.status).toBe(201)
//     expect(created).not.toBeNull()
// });
