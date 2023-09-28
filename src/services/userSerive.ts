import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/userRepository";
import { duplicatedEmailError, invalidCredentialsError } from "../errors/error";

async function createUser(name: string, email: string, password: string) {
    await uniqueEmail(email);

    const hashedPassword = await bcrypt.hash(password, 12);
    return await userRepository.createUser(name, email, hashedPassword);
};

type user = {
    name: string,
    email: string,
    password: string

}

async function login(email: string, password: string) {
    const user: user = await getUserOrFail(email);
    await validatePasswordOrFail(password, user.password);
    const userName = user.name;

    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error("JWT secret key not defined.");
    }
    const token = jwt.sign({ userName }, secret, { expiresIn: '1h' });
    return { token };
}



// rules

async function uniqueEmail(email: string) {
    const userWithSameEmail = await userRepository.findByEmail(email);
    if (userWithSameEmail) {
        throw duplicatedEmailError()
    };
};

async function getUserOrFail(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw invalidCredentialsError();
    return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) throw invalidCredentialsError();
}
export const userService = {
    createUser,
    login
};