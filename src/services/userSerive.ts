import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/userRepository";
import { duplicatedEmailError } from "../errors/error";


async function createUser(name: string, email: string, password: string) {
    //await uniqueEmail(email);

    const hashedPassword = await bcrypt.hash(password, 12);
    return await userRepository.createUser(name, email, hashedPassword);
};

async function uniqueEmail(email: string) {
    const userWithSameEmail = await userRepository.findByEmail(email);
console.log(userWithSameEmail)
    if (userWithSameEmail) {
        throw duplicatedEmailError()
    };
};

export const userService = {
    createUser
};