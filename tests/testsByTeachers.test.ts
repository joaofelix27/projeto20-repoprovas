import app from '../src/app'
import supertest from 'supertest'
import prisma from '../src/db/prisma '
import { userFactory } from './factories/userFactory'

const agent=supertest(app)

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "tests"`
});

describe('GET /tests/teachers', () => {

    it('Expected to return 401 when not sending an authorization', async () => {
        const result = await agent.get('/tests/teachers')

        expect(result.status).toBe(401)
    });

    it('Expected to return 401 when not sending a valid token', async () => {
        const token =''
        const result = await agent.get('/tests/teachers').set({Authorization:`Bearer ${token}`})

        expect(result.status).toBe(401)
    });


    it('Expected to return 200 when the token is valid and the test by teachers is returned', async () => {
        const user = userFactory()
        await supertest(app).post('/sign-up').send(user)
        const resultLogin = await agent.post('/sign-in').send({email:user.email,password:user.password})
        const result = await agent.get('/tests/teachers').set({Authorization:`Bearer ${resultLogin.text}`})
        expect(result.status).toBe(200)
        expect(result.text).not.toBeNull()
    });
})

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`
    await prisma.$disconnect();
});