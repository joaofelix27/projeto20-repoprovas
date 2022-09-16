import { tests} from "@prisma/client"
import { Request,Response } from "express";


export type ITestData = Omit<tests, 'id'>;

export type testServiceType =(
   authData:ITestData 
) => Promise<any>
