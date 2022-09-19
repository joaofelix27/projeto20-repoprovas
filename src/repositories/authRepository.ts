import prisma from "../db/prisma ";
import { IUsersData } from "../types/authTypes";

export async function findUnique (email:string){
    return await prisma.users.findUnique({
        where: {
          email: email
        }
      });
}

export async function createRegister (register:IUsersData){
    return await prisma.users.create({ data: {...register} });
}

export async function createRegisterFromGitHub (email:string){
  return await prisma.users.create({ data: {email} });
}

export async function findAllUsers (){
  return await prisma.users.findMany();
}
