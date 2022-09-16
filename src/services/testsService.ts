import * as testsRepository from '../repositories/testsRepository'
import { testServiceType } from '../types/testTypes';


export const createTest: testServiceType = async (testData) => {
  return await testsRepository.createTest(testData)
};
