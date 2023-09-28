
import { createUser, login } from "../controllers/userController";
import { Router } from "express";

const userRouter = Router();

userRouter
    .post("/signUp", createUser)
    .post("/signIn", login)

export { userRouter };