import express, { json } from "express";
import cors from "cors";
import { userRouter } from "./routes";



const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("ok"))
  .use("/users", userRouter)

  export default app;