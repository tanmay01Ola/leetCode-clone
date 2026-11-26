import dotenv from "dotenv";
dotenv.config({
    path : "../../.env"
})
import {createClient} from "redis";
const url = process.env.REDIS_URL;
export const redisClient = createClient({url : url})


