import { getCategoryById } from '../repositories/categoriesRepository';
import { getDisciplineById } from '../repositories/disciplinesRepository';
import * as testsRepository from '../repositories/testsRepository'
import * as authRepository from '../repositories/authRepository'
import { testServiceType } from '../types/testTypes';
import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'
import dayjs from 'dayjs'
dotenv.config()

export const createTest: testServiceType = async (testData) => {
    const year=dayjs().format("YYYY")
    const category= await getCategoryById(testData.categoryId)
    const API_KEY= process.env.EMAIL_API_KEY || "Erro"
    sgMail.setApiKey(API_KEY)

    if (!category) {
        throw {type:"not_found",message:"This category id does not exists"}
    }
    const discipline = await getDisciplineById (testData.teacherDisciplineId)
    if (!discipline) {
        throw {type:"not_found",message:"This teacher discipline id does not exists"}
    }
    const createTest =  await testsRepository.createTest(testData)
    const findUsers =  await authRepository.findAllUsers()

      findUsers.forEach ( value => {
      const emailSend= {
        to:value.email,
        from:'joaofelix27@gmail.com',
        subject:'Prova',
        text:"Eae",
        html:`<h1>A seguinte prova foi adicionada: ${createTest.name} ${category.name} ${year} - ${createTest.pdfUrl} (${discipline.name})</h1>`
      }
      sgMail.send(emailSend).then(response => console.log("Emails Enviados")).catch((error)=>console.log(error.message))
    })
  
  return createTest
};

export const getTestByDisciplines = async () => {

  return await testsRepository.getTestByDiscipline()
};

export const getTestByTeachers = async () => {
const result = await testsRepository.getTestByTeachers()
  return result
};