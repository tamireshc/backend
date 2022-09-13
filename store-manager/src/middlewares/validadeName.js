const Joi = require('joi');

const schemaName = Joi.string().min(5).required().messages({
  'string.empty': '"name" is required',
  'any.required': '"name" is required',
  'string.min': '"name" length must be at least 5 characters long',

});

const validadeName = (req, res, next) => {
  const { name } = req.body;
  const validator = schemaName.validate(name);
  if (validator.error && validator.error.details[0].type === 'string.min') {
    return res.status(422).json({ message: validator.error.details[0].message });
  } if (validator.error) {
    return res.status(400).json({ message: validator.error.details[0].message });
  }
  next();
};

module.exports = validadeName;