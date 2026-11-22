import { Router } from "express";
export const submissionRouter = Router();
import { auth, type Auth } from "../middlewares/authMiddleware";
import { db } from "db";
import { submissionBody } from "../zod";
import {redisClient} from "../../worker/client";
import {WorkerLoop} from "../../worker/index"
redisClient.connect()
submissionRouter.post("/:problemId",auth ,  async(req : Auth   ,res)=>{
const userId = req.id;
if(!userId){
    return(res.status(403).json({
        message : "USER_NOT_LOGGED_IN"
    }))
}
    const problemId = req.params.problemId;
    if(!(typeof problemId === "string")){
         return(
            res.status(400).json({
                message : "BAD_REQUEST"
            })
         )
    }
    const parsedBody = submissionBody.safeParse(req.body);
    if(!parsedBody.success){
        return(res.status(400).json({
            message : "BAD_INPUTS"
        }))
    }
    const {code , language } = parsedBody.data;
   const response = await db.orm.public.ProblemStatus.create({
    userId : userId,
    code : code,
    language :language,
    status : "accepted",
    problemId : problemId
   })
    const submissionId = response.id

    const job = {
        problemId,
        code ,
        language ,
        submissionId
    }
    await redisClient.lPush("problems" , JSON.stringify({job}))
    console.log("BEFORE THAT")
   WorkerLoop()
    res.json({
        message : "processing..",
       submitId : submissionId   
    })

})