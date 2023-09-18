const Joi = require('@hapi/joi');

// Register validation
const registerValidation = (data) => {
    const userSchema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return userSchema.validate(data).error;
}

// Login validation
const loginValidation = (data) => {
    const userSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return userSchema.validate(data).error;
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
