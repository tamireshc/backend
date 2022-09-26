const Joi = require('joi');

const FIELD_MISSING = 'Some required fields are missing';

const UserSchema = Joi.object({
    displayName: Joi.string().min(8).required().messages({
        'string.min': '"displayName" length must be at least 8 characters long',
        'any.required': FIELD_MISSING,
        'string.empty': FIELD_MISSING,
    }),

    email: Joi.string().required().email().messages({
        'any.required': FIELD_MISSING,
        'string.empty': FIELD_MISSING,
        'string.email': '"email" must be a valid email',
    }),
    password: Joi.string().required().min(6).messages({
        'string.min': '"password" length must be at least 6 characters long',
        'any.required': FIELD_MISSING,
        'string.empty': FIELD_MISSING,
    }),
    image: Joi.string(),

});

const validateCreateUserInputs = (req, res, next) => {
    const validator = UserSchema.validate(req.body);
    if (validator.error) {
        return res.status(400).json({ message: validator.error.details[0].message });
    }
    next();
};

module.exports = { validateCreateUserInputs };