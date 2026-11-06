import { Router } from "express";
export const submissionRouter = Router();
import { createClient } from "redis"
import { auth, type Auth } from "../middlewares/authMiddleware";
import { db } from "db";
import { submissionBody } from "../zod";

const client = createClient()
client.connect();
submissionRouter.post("/:problemId", async(req   ,res)=>{
    try{
        console.log("HERERER")
    const problemId = req.params.problemId;
    // const userId = req.userId;
    // if(!userId){
    //     return(res.status(400).json({
    //         message : "BAD_REQUEST"
    //     }))
    // }
    const parsedBody = submissionBody.safeParse(req.body);
    if(!parsedBody.success){
        return(res.status(400).json({
            message : "BAD_INPUTS"
        }))
    }
    const {code , language } = parsedBody.data;
    console.log("BEFORE RESPONSE")
   const response = await db.orm.public.ProblemStatus.create({
    code : code,
    language :language,
    status : "accepted",
    problemId : problemId
   })
    const submissionId = response.id
    client.lPush("problems" , JSON.stringify({ problemId , code , language ,submissionId}))

    res.json({
        message : "processing..",
       submitId : submissionId   
    })
} 
catch(err){
    throw new Error("smthn is gdbd")
}
})