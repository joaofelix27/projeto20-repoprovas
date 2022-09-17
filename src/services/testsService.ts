import { getCategoryById } from '../repositories/categoriesRepository';
import { getDisciplineById } from '../repositories/disciplinesRepository';
import * as testsRepository from '../repositories/testsRepository'
import { testServiceType } from '../types/testTypes';


export const createTest: testServiceType = async (testData) => {
    const category= await getCategoryById(testData.categoryId)
    if (!category) {
        throw {type:"not_found",message:"This category id does not exists"}
    }
    const discipline = await getDisciplineById (testData.teacherDisciplineId)
    if (!discipline) {
        throw {type:"not_found",message:"This teacher discipline id does not exists"}
    }

  return await testsRepository.createTest(testData)
};

export const getTestByDiscipline = async () => {

  return await testsRepository.getTestByDiscipline()
};