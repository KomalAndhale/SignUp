const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        add:Joi.string().min(3).max(200).required(),
        password: Joi.string().min(6).max(100).pattern(new RegExp(/[A-Z]/)).pattern(new RegExp(/[a-z]/)).pattern(new RegExp(/[0-9]/)).required()
        .messages({
            'string.min': 'Password must be at least 6 characters long.',
            'string.max': 'Password must be at most 100 characters long.',
            'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
            'any.required': 'Password is required.',
          }),
        repassword: Joi.string().min(6).max(100).pattern(new RegExp(/[A-Z]/)).pattern(new RegExp(/[a-z]/)).pattern(new RegExp(/[0-9]/)).required()
        .messages({
            'string.min': 'Password must be at least 6 characters long.',
            'string.max': 'Password must be at most 100 characters long.',
            'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
            'any.required': 'Password is required.',
          })
    });
    const { error } = schema.validate(req.body);
    /*const minLength = 6; // Minimum length
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // Special character
    const upperCaseRegex = /[A-Z]/; // Uppercase letter
    const lowerCaseRegex = /[a-z]/; // Lowercase letter
    const numberRegex = /[0-9]/; // Number */
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    // if(password.length < minLength && !specialCharRegex.test(pass) && !upperCaseRegex.test(pass) && !lowerCaseRegex.test(pass)) {
    //     return `Password must be at least ${minLength} characters long.`;
    // }
    
    
    
  
    next();
}
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}
module.exports = {
    signupValidation,
    loginValidation
}