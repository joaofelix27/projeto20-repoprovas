import prisma from "../db/prisma ";
import { ITestData } from "../types/testTypes";


export async function createTest (test:ITestData){
    return await prisma.tests.create({ data: {...test} });
}

export async function getTestByDiscipline(){
    return await prisma.terms.findMany({
        select:{
            number: true,
            disciplines:{
                select:{
                    name: true,
                    teachersDisciplines: {
                    select:{
                            tests:{distinct:['categoryId'],
                           select:{
                               categories:{
                                   select:{
                                       name:true,
                                       tests:{
                                        select:{
                                            id: true,
                                            name: true,
                                            pdfUrl: true,
                                            teachersDisciplines:{
                                                select:{teachers:{select:{name:true}}},
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
    })
}
