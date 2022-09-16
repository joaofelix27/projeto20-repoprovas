import { users} from "@prisma/client"
import { Request,Response } from "express";


export type IUsersData = Omit<users, 'id'>;

export type authServiceType =(
   authData:IUsersData 
) => Promise<any>

export type controllersType =(
  req:Request,
  res:Response
) => Promise<any>