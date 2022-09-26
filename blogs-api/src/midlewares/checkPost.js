const Joi = require('joi');

const FIELD_MISSING = 'Some required fields are missing';

const postSchema = Joi.object({
    title: Joi.string().required().messages({
        'any.required': FIELD_MISSING,
        'string.empty': FIELD_MISSING,
    }),
    content: Joi.string().required().messages({
        'any.required': FIELD_MISSING,
        'string.empty': FIELD_MISSING,
    }),
    categoryIds: Joi.array().required().messages({
        'any.required': FIELD_MISSING,
        'string.empty': FIELD_MISSING,
    }),

});

const validatePostInputs = (req, res, next) => {
    const validator = postSchema.validate(req.body);
    if (validator.error) {
        return res.status(400).json({ message: validator.error.details[0].message });
    }
    
    next();
};

module.exports = { validatePostInputs };