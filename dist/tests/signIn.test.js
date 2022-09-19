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
    yield prisma_1.default.$executeRaw `TRUNCATE TABLE "users"`;
}));
describe('POST /sign-in', () => {
    it('Expected to return 422 when sending a incorrect user format in sign-in', () => __awaiter(void 0, void 0, void 0, function* () {
        const incorrectUser = {
            email: "abacate",
            password: "aaaaa",
        };
        const result = yield agent.post('/sign-in').send(incorrectUser);
        expect(result.status).toBe(422);
    }));
    it("Expected to return 422 when send a user with sign-up format", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, userFactory_1.userFactory)();
        const result = yield agent.post('/sign-in').send(user);
        expect(result.status).toBe(422);
    }));
    it("Expected to return 401 when the user try to sign-in with an incorrect email", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, userFactory_1.userFactory)();
        yield (0, supertest_1.default)(app_1.default).post('/sign-up').send(user);
        const result = yield agent.post('/sign-in').send({ email: "Oi" + user.email, password: user.password });
        expect(result.status).toBe(401);
    }));
    it("Expected to return 401 when the user try to sign-in with an incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, userFactory_1.userFactory)();
        yield (0, supertest_1.default)(app_1.default).post('/sign-up').send(user);
        const result = yield agent.post('/sign-in').send({ email: user.email, password: user.password + "a" });
        expect(result.status).toBe(401);
    }));
    it("Expected to return 200 when the email is correct and the password matches the email", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, userFactory_1.userFactory)();
        yield (0, supertest_1.default)(app_1.default).post('/sign-up').send(user);
        const result = yield agent.post('/sign-in').send({ email: user.email, password: user.password });
        expect(result.status).toBe(200);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$executeRaw `TRUNCATE TABLE "users"`;
    yield prisma_1.default.$disconnect();
}));
