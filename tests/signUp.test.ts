import app from '../src/app'
import supertest from 'supertest'
import prisma from '../src/db/prisma '
import { userFactory } from './factories/userFactory'

const agent=supertest(app)

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`
});

describe('POST /sign-up', () => {
    it('Expected to return 422 when sending a incorrect user format in sign-up', async () => {
        const incorrectUser = {
            email: "abacate", 
            password: "aaaaa",
            confirmedPassword:"aaaaa"
        };

        const result = await agent.post('/sign-up').send(incorrectUser);

        expect(result.status).toBe(422)
    });

    it("Expected to return 422 when password doesn't match with confirmedPassword", async () => {
        const incorrectPassword = {
            email: "joaofelix27@gmail.com",
            password: "070707",
            confirmPass: "070708"
        }

        const result = await agent.post('/sign-up').send(incorrectPassword)

        expect(result.status).toBe(422)
    });

    it("Expected to return 409 when the user try to sign-up with an email that is already on the database", async () => {
        const user = userFactory()
        const firstResult=await  agent.post('/sign-up').send(user)
        const result = await agent.post('/sign-up').send(user)

        expect(result.status).toBe(409)
    });

    it("Expected to return 201 when the user data is correct and there are no conflicts in the database", async () => {
        const user = userFactory()

        const result = await supertest(app).post('/sign-up').send(user);

        expect(result.status).toBe(201);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});