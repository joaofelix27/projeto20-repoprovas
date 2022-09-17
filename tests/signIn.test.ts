import app from '../src/app'
import supertest from 'supertest'
import prisma from '../src/db/prisma '
import { userFactory } from './factories/userFactory'

const agent=supertest(app)

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`
});

describe('POST /sign-in', () => {
    it('Expected to return 422 when sending a incorrect user format in sign-in', async () => {
        const incorrectUser = {
            email: "abacate", 
            password: "aaaaa",
        };

        const result = await agent.post('/sign-in').send(incorrectUser);

        expect(result.status).toBe(422)
    });

    it("Expected to return 422 when send a user with sign-up format", async () => {
        const user = userFactory()

        const result = await agent.post('/sign-in').send(user)

        expect(result.status).toBe(422)
    });

    it("Expected to return 401 when the user try to sign-in with an incorrect email", async () => {
        const user = userFactory()
        
        await supertest(app).post('/sign-up').send(user)

        const result = await agent.post('/sign-in').send({email: "Oi"+ user.email ,password:user.password})

        expect(result.status).toBe(401)
    });

    it("Expected to return 401 when the user try to sign-in with an incorrect password", async () => {
        const user = userFactory()
        
        await supertest(app).post('/sign-up').send(user)

        const result = await agent.post('/sign-in').send({email:user.email,password:user.password + "a"})

        expect(result.status).toBe(401)
    });

    it("Expected to return 200 when the email is correct and the password matches the email", async () => {
        const user = userFactory()
        
        await supertest(app).post('/sign-up').send(user)

        const result = await agent.post('/sign-in').send({email:user.email,password:user.password})

        expect(result.status).toBe(200)
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});