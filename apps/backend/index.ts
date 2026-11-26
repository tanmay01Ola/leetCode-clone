import express from "express";
import cors from "cors";
const app = express();
app.use(cors())
import { UserRouter } from "./router/userRouter";
import { problemRouter } from "./router/problemRouter";
import { submissionRouter } from "./router/submission";
app.use(express.json())
app.use("/user" , UserRouter);
app.use("/" , problemRouter)
app.use("/submission", submissionRouter)
app.listen(4000)