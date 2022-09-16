import dotenv from "dotenv";
import { NextFunction,Request,Response } from "express";
import jsonwebtoken from "jsonwebtoken";


dotenv.config();

export default async function validateUser(req:Request, res:Response, next:NextFunction) {
  const { authorization } = req.headers;
  const token:string = <string>authorization?.replace("Bearer ", "");
 const secret:string=(process.env.SECRET)?.toString() || "Secret" ;
  // Verify if the token is valid
  jsonwebtoken.verify(token, secret, function (err, decoded:any) {
    if (err) {
      throw{ type:"unauthorized", message: "Failed to authenticate token." };
    }
    // se tudo estiver ok, salva no request para uso posterior
    res.locals.userId = decoded.id;
    next();
  });
}
