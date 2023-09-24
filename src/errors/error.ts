type ApplicationError = {
    name: string;
    message: string;
};

export function duplicatedEmailError(): ApplicationError {
    return {
        name: "DuplicatedEmailError",
        message: "E-mail already registered",
    };
};
