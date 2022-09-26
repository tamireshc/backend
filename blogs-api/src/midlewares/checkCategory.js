const Joi = require('joi');

const categoryShema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': '"name" is required',
        'string.empty': '"name" is required',
    }),
});

const validateCategoryInputs = (req, res, next) => {
    const validator = categoryShema.validate(req.body);
    if (validator.error) {
        return res.status(400).json({ message: validator.error.details[0].message });
    }
    next();
};

module.exports = {
    validateCategoryInputs,
};