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
const app_1 = __importDefault(require("../src/app"));
const supertest_1 = __importDefault(require("supertest"));
const prisma_1 = __importDefault(require("../src/db/prisma "));
const userFactory_1 = require("./factories/userFactory");
const agent = (0, supertest_1.default)(app_1.default);
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$executeRaw `TRUNCATE TABLE "tests"`;
}));
describe('GET /tests/disciplines', () => {
    it('Expected to return 401 when not sending an authorization', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield agent.get('/tests/disciplines');
        expect(result.status).toBe(401);
    }));
    it('Expected to return 401 when not sending a valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = '';
        const result = yield agent.get('/tests/disciplines').set({ Authorization: `Bearer ${token}` });
        expect(result.status).toBe(401);
    }));
    it('Expected to return 200 when the token is valid and the test by disciplines is returned', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, userFactory_1.userFactory)();
        yield (0, supertest_1.default)(app_1.default).post('/sign-up').send(user);
        const resultLogin = yield agent.post('/sign-in').send({ email: user.email, password: user.password });
        const result = yield agent.get('/tests/disciplines').set({ Authorization: `Bearer ${resultLogin.text}` });
        expect(result.status).toBe(200);
        expect(result.text).not.toBeNull();
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$executeRaw `TRUNCATE TABLE "users"`;
    yield prisma_1.default.$disconnect();
}));
