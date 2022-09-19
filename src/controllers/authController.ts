import * as authService  from '../services/authService';
import { controllersType, IUsersData } from '../types/authTypes';
import axios from 'axios'
import dotenv from 'dotenv'
import qs from 'query-string'
dotenv.config()


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

export const gitHubLogin:controllersType = async(req,res) => {
    const {code} = req.body
    const token = await getGitHubToken(code)
    const user= await fetchUser(token)
    const result:string = await authService.gitHubLogin(user)
    if (result) {
    return res.status(200).send(result)
    } else {
        throw {type:"error", message:"It was not possible to login"}
    }

}

async  function getGitHubToken (code:any) {
    const github_url='https://github.com/login/oauth/access_token'
    const {REDIRECT_URL,CLIENT_ID,CLIENT_SECRET}=process.env
    const body = {
        code,
        grant_type:'authorization_code',
        redirect_uri:REDIRECT_URL,
        client_id:CLIENT_ID, 
        client_secret:CLIENT_SECRET
    }

    const {data}=await axios.post(github_url,body,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    const parsedData=qs.parse(data)
    return parsedData.access_token
}

async function fetchUser(token:any) {
    const response= await axios.get("http://api.github.com/user",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
    
}