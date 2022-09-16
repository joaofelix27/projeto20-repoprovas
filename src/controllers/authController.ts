import * as authService  from '../services/authService';
import { controllersType, IUsersData } from '../types/authTypes';


export const register:controllersType = async (req,res) => {
    const registerData: IUsersData = req.body
    const {email,password}=registerData
    const result = await authService.register({email,password})
    
    if (result) {
    return res.sendStatus(201)
    } else {
        throw {type:"error", message:"It was not possible to register"}
    }

}
export const login:controllersType = async(req,res) => {
    const loginData: IUsersData = req.body
    const {email,password}=loginData
    const result:string = await authService.login({email,password})

    if (result) {
    return res.status(200).send(result)
    } else {
        throw {type:"error", message:"It was not possible to login"}
    }

}
