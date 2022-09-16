import * as testsService from '../services/testsService';
import { controllersType } from '../types/authTypes';
import { ITestData } from '../types/testTypes';


export const createTest:controllersType = async (req,res) => {
    const testData: ITestData = req.body
    const {name,pdfUrl,categoryId,teacherDisciplineId}=testData
    const result = await testsService.createTest(testData)
    
    if (result) {
    return res.sendStatus(201)
    } else {
        throw {type:"error", message:"It was not possible to create the test"}
    }

}