import { Router } from "express";
import { signupBody } from "../zod";
import { db } from "db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const UserRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET
if(!JWT_SECRET){
    throw new Error("JWT_SECRET_NOT_SIGNED_UP")
}
UserRouter.post("/signup" , async(req ,res)=>{
    const parsedBody = signupBody.safeParse(req.body);
    if(!parsedBody.success){
        return(
            res.status(400).json({
                message : "BAD_INPUTS"
            })
        )
    }   
    const {username , email , password , role} = parsedBody.data;
    const hashedPassword = await bcrypt.hash(password , 10);
 const addUser = await db.orm.public.User.create({
    username : username ,
    password : password,
    email : email,
    role : role
 })
    if(!addUser){
        return(res.status(400).json({
            message : "CAN'T_SIGNUP"
        }))
    }
    res.json({
        message : "USER_SIGNED_UP",
        id : addUser.id
    })
})


UserRouter.post("/signin" , async(req ,res)=>{
    const parsedBody = signupBody.safeParse(req.body);
    if(!parsedBody.success){
        return(res.status(400).json({
            message : "BAD_INPUTS"
        }))
    }
    const {email , password} = parsedBody.data;
    const user = await db.orm.public.User.where({email : email }).first();
    if(!user){
        return(res.status(404).json({
            message : "EMAIL_NOT_SIGNED_UP"
        }))
    }
    const comparedPassword = await bcrypt.compare(password , user.password);
    if(!comparedPassword){
        return(res.status(400).json({
            message : "INCORRECT_PASSWORD"
        }))
    }
   const token = jwt.sign(user.id , JWT_SECRET)
    res.json({
        message : "USER_LOGGED_IN",
         token : token
    })
})