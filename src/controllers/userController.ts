import { Request, Response } from "express";
import { userService } from "../services/userSerive";



async function handleRequest(promise: Promise<any>, res: Response, successCode: number) {
    try {
        const data = await promise;
        res.status(successCode).send(data);
    } catch (error) {
        console.log(error)

    }
}
    export default async function createUser(req: Request, res: Response) {
        const { name, email, password } = req.body;
        handleRequest(userService.createUser(name, email, password), res, 201);
    };