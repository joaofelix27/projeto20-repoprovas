import app from '../src/app'
import supertest from 'supertest'
import prisma from '../src/db/prisma '
import { userFactory } from './factories/userFactory'
import { testFactory } from './factories/testFactory'

const agent=supertest(app)

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "tests"`
});

describe('POST /tests/create', () => {
    it('Expected to return 422 when sending a test without name', async () => {
        const {name, ...incorrectSchemaTest} = testFactory()
        const result = await agent.post('/tests/create').send(incorrectSchemaTest);

        expect(result.status).toBe(422)
    });

    it('Expected to return 422 when sending a test without pdfUrl', async () => {
        const {pdfUrl, ...incorrectSchemaTest} = testFactory()

        const result = await agent.post('/tests/create').send(incorrectSchemaTest);

        expect(result.status).toBe(422)
    });
     
    it('Expected to return 422 when sending a test without categoryId', async () => {
        const {categoryId, ...incorrectSchemaTest} = testFactory()

        const result = await agent.post('/tests/create').send(incorrectSchemaTest);

        expect(result.status).toBe(422)
    });

    it('Expected to return 422 when sending a test without teacherDisciplineId', async () => {
        const {teacherDisciplineId, ...incorrectSchemaTest} = testFactory()

        const result = await agent.post('/tests/create').send(incorrectSchemaTest);

        expect(result.status).toBe(422)
    });


    it('Expected to return 422 when sending a test with the wrong schema types', async () => {
        const incorrectSchemaTest = testFactory()

        const result = await agent.post('/tests/create').send({...incorrectSchemaTest,categoryId:"2",teacherDisciplineId:"1"});

        expect(result.status).toBe(422)
    });

    it('Expected to return 401 when not sending an authorization', async () => {
        const correctSchemaTest = testFactory()
        const result = await agent.post('/tests/create').send(correctSchemaTest)

        expect(result.status).toBe(401)
    });

    it('Expected to return 404 when sending an incorrect categoryId', async () => {
        const user = userFactory()
        await supertest(app).post('/sign-up').send(user)
        const resultLogin = await agent.post('/sign-in').send({email:user.email,password:user.password})
        const correctSchemaTest = testFactory()
        const result = await agent.post('/tests/create').send({...correctSchemaTest,teacherDisciplineId:1}).set({Authorization:`Bearer ${resultLogin.text}`})

        expect(result.status).toBe(404)
    });

    it('Expected to return 404 when sending an incorrect teacherDisciplineId', async () => {
        const user = userFactory()
        await supertest(app).post('/sign-up').send(user)
        const resultLogin = await agent.post('/sign-in').send({email:user.email,password:user.password})
        const correctSchemaTest = testFactory()
        const result = await agent.post('/tests/create').send({...correctSchemaTest,categoryId:1}).set({Authorization:`Bearer ${resultLogin.text}`})

        expect(result.status).toBe(404)
    });

    it('Expected to return 201 when all the data needed is correct and the test is created', async () => {
        const user = userFactory()
        await supertest(app).post('/sign-up').send(user)
        const resultLogin = await agent.post('/sign-in').send({email:user.email,password:user.password})
        const correctSchemaTest = testFactory()
        const result = await agent.post('/tests/create').send({...correctSchemaTest,categoryId:1,teacherDisciplineId:1}).set({Authorization:`Bearer ${resultLogin.text}`})

        expect(result.status).toBe(201)
    });
})

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`
    await prisma.$disconnect();
});