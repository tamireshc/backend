const Joi = require('joi');

const schemaInsertSale = Joi.array().items(Joi.object({
  productId: Joi.number().required()
    .messages({
      'string.empty': '"productId" is required',
      'any.required': '"productId" is required',
    }),
  quantity: Joi.number().min(1)
    .required()
    .messages({
      'string.empty': '"quantity" is required',
      'any.required': '"quantity" is required',
      'number.min': '"quantity" must be greater than or equal to 1',
    }),
}));

const validadeInsertSale = (req, res, next) => {
  const validator = schemaInsertSale.validate(req.body);
  if (validator.error && validator.error.details[0].type === 'number.min') {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  } if (validator.error) {
    // console.log(validator.error.details[0].type);
    return res.status(400).json({ message: validator.error.details[0].message });
  }
  next();
};

module.exports = validadeInsertSale;