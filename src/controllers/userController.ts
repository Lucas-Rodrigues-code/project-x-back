import { Request, Response } from "express";
import { userService } from "../services/userSerive";

async function handleRequest(promise: Promise<any>, res: Response, successCode: number) {
    try {
        const data = await promise;
        res.status(successCode).send(data);
    } catch (error: any) {
        console.log(error)
        if (error.name === "invalidCredentialsError") return res.status(401).send(error);
    }
}
export async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    handleRequest(userService.createUser(name, email, password), res, 201);
};

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    handleRequest(userService.login(email, password), res, 201);
};