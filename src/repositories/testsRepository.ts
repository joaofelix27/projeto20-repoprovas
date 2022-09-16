import prisma from "../db/prisma ";
import { ITestData } from "../types/testTypes";


export async function createTest (test:ITestData){
    return await prisma.tests.create({ data: {...test} });
}