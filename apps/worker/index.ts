import {redisClient} from "./client";
import { language } from "./language";
import fs from "fs";
export async function WorkerLoop(){
    console.log("WORKER RAN")
    while(true){
    const popped = await redisClient.brPop("problems" , 0);
    if(!popped) continue
    const parsed = JSON.parse(popped.element);
   const code =  parsed.job.code;
    const language = parsed.job.language;
    console.log("LANGUAGE=" , language);
    if (language === "javascript"){
        const filePath = __dirname + "/code/a.js";

      fs.writeFileSync(filePath , code);
      
    }
    }
}