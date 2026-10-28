import { Router } from "express";
import { problemBody } from "../zod";
import { db } from "db"
import { hasRole } from "../helper/role";
import { auth } from "../middlewares/authMiddleware";
export const problemRouter = Router();
import type { Auth } from "../middlewares/authMiddleware";


problemRouter.post("/addProblem" ,auth ,async (req : Auth,res)=>{
    const userId = req.userId;
    if(!userId){
        return(res.status(402).json({
            message : "USER NOT LOGGED IN"
        }))
    }
    const parsedBody = problemBody.safeParse(req.body);
    if(!parsedBody.success){
        return(res.status(400).json({
            message : "BAD_INPUTS"
        }))
    }
   if(await hasRole(userId) === "user"){
    return(res.status(422).json({
        message : "NOT_AUTHORIZED"
    }))
   }
    const {problemStatement , description , difficultyLevel , memoryLimit , CPULimit} = parsedBody.data;
    const addProblem = await db.orm.public.Problems.create({
        problemStatement : problemStatement,
        description : description,
        difficultyLevel : difficultyLevel,
        memoryLimit :memoryLimit,
        CPUlimit : CPULimit
    })
    if(!addProblem){
        return(res.status(402).json({
            message : "CAN'T_ADD_PROBLEM"
        }))
    }

    res.json({
        message : "PROBLEM_CREATED",
        problemId : addProblem.id
    })

})