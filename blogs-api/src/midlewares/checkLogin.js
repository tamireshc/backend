const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().required().messages({
        'any.required': 'Some required fields are missing',
        'string.empty': 'Some required fields are missing',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Some required fields are missing',
        'string.empty': 'Some required fields are missing',
    }),

});

const validateLoginInputs = (req, res, next) => {
    const validator = loginSchema.validate(req.body);
    // console.log(validator.error.details[0]);
    if (validator.error) {
        return res.status(400).json({ message: validator.error.details[0].message });
    }
    next();
};

module.exports = { validateLoginInputs };