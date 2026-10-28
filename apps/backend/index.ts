import express from "express";
import { UserRouter } from "./router/userRouter";
import { problemRouter } from "./router/problemRouter";

const app = express();


app.use(express.json())

app.use("/signup" , UserRouter);
app.use("/signin" , UserRouter);
app.use("/addProblem" , problemRouter)
app.listen(3000)