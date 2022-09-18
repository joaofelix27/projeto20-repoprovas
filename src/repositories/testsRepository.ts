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

// export async function getTestByTeachers(){
//     return  await prisma.teachers.findMany({
//         include: {
//           teachersDisciplines: {
//             select: {
//               tests: {
//                 distinct: ["categoryId"],
//                 select: {
//                   categories: {
//                     select: {
//                       id: true,
//                       name: true,
//                       tests: {
//                         select: {
//                             id:true,
//                           name: true,
//                           pdfUrl: true,
//                           teachersDisciplines: {
//                             select: {
//                               disciplines: true,
//                             },
//                           },
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       });
//         }
// export async function getTestByTeachers(){
//     return await prisma.teachersDisciplines.findMany({
//         distinct:['teacherId'],
//         select:{
//             teachers:{
//                 select:{
//                     name:true,
//                     teachersDisciplines:{distinct:['teacherId'],
//                         select:{
//                            tests:{distinct:['categoryId'],
//                                 select:{
//                                     categories:{
//                                         select:{
//                                             name:true,
//                                             tests:{
//                                                 select:{
//                                                     id:true,
//                                                     name: true,
//                                                     teachersDisciplines:{
//                                                         select:{
//                                                             disciplines:{
//                                                                 select:{
//                                                                     name:true
//                                                                 }
//                                                             }
//                                                         }
//                                                     }
//                                                 }
//                                             }
//                                         }
//                                     }
//                                 }
//                             }
//                         }
//                     }
                    
//                 }
//             }
           
//         }
//     })
// }

export async function getTestByTeachers () {
    return await prisma.$queryRaw`SELECT * FROM tests`
}