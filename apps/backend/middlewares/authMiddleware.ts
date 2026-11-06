import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
interface payload {
    id : string
}
export interface Auth extends Request {
    id? : string
}
if(!JWT_SECRET){
    throw new Error("JWT_SECRET_NOT_SET_UP")
}
export function auth(req  : Auth, res : Response, next : NextFunction){ 
     const authHeader = req.headers.authorization;
     console.log("AUTHHEADER" , authHeader)
     if(!authHeader?.startsWith("Bearer")){
        return(res.status(402).json({
            message : "BAD_REQUEST"
        }))
     }

     const token = authHeader.split(" ")[1];
     console.log("TOKEN=" , token)
    if(!token){
        return(res.status(403).json({
            message : "TOKEN_NOT_SENT"
        }))
    }
const payload = jwt.verify(token , (JWT_SECRET)!) as string;
     console.log("PAYLOAD" , payload)
     req.id = payload;
     next()
}