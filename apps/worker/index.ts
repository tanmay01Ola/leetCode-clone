import { spawn } from "child_process";
import {redisClient} from "./client";
import fs from "fs";
import { db } from "db/client";
import { submissionBody } from "../backend/zod";
import { exit } from "process";
import { preconnect } from "react-dom";
export async function WorkerLoop(){
       while(true){
    const popped = await redisClient.brPop("problems" , 0);
    if(!popped) continue
    const parsed = JSON.parse(popped.element);
   const code =  parsed.job.code;
    const language = parsed.job.language;
    let finalOutput = "";
    if (language === "javascript"){
        const filePath = __dirname + "/code/a.js";

    fs.writeFileSync(filePath , code);
      const response = spawn("node" , [filePath]);
      response.stdout.on("data" ,(chunk)=>{
        finalOutput = finalOutput + chunk.toString();
      })
      response.stderr.on("data" , (error)=>{
        finalOutput = finalOutput + error.toString();
      })

      response.on("close" , async(exitCode)=>{
        if(exitCode === 0){
                 const result = await db.orm.public.ProblemStatus.where({id : parsed.job.problemId}).update({
                  status : "accepted"
       })
        }
        else {
          const result = await db.orm.public.ProblemStatus.where({id : parsed.job.submissionId}).update({
            status : "attempted"
          })
        }
      })
    }
    }     
   
}