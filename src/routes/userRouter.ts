
import { validateBodyMiddleware } from "../middlewares/bodyMiddleware";
import { createUser, login } from "../controllers/userController";
import { Router } from "express";
import { createUserSchema, loginUserSchema } from "../schemas/userSchema";

const userRouter = Router();

userRouter
    .post("/signUp", validateBodyMiddleware(createUserSchema), createUser)
    .post("/signIn", validateBodyMiddleware(loginUserSchema), login)

export { userRouter };