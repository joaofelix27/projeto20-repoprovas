import connection from "../db/prisma ";
import { IUsersData } from "../types/authTypes";

export async function findUnique (email:string){
    return await connection.users.findUnique({
        where: {
          email: email
        },
      });
}

export async function createRegister (register:IUsersData){
    return await connection.users.create({ data: {...register} });
}