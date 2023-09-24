
import createUser from "../controllers/userController";
import { Router } from "express";

const userRouter = Router();

userRouter
    .post("/signUp", createUser)
  
export { userRouter };