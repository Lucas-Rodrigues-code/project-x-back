import Joi from "joi";


export const createUserSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'))
        .required(),
})

//A senha deve ter pelo menos 8 caracteres 
//A senha deve conter pelo menos uma letra maiúscula ((?=.*[A-Z])).
//A senha deve conter pelo menos uma letra minúscula ((?=.*[a-z])).
//A senha deve conter pelo menos um dígito ((?=.*\\d)).
//A senha deve conter pelo menos um caractere especial (por exemplo, @, $, !, %, *, ?, &) ((?=.*[@$!%*?&])).