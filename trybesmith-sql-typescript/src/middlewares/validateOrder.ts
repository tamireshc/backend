import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const orderSchema = Joi.object({
  productsIds: Joi.array().items(Joi.number().required()).required()
    .messages({
      'array.empty': '"productsIds" is required',
      'string.base': '"productsIds" must be an array',
      'array.base': '"productsIds" must be an array',
      'number.base': '"productsIds" must include only numbers',
      'array.includesRequiredUnknowns': '"productsIds" must include only numbers',
    }),

});

const orderMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const teste = req.body.productsIds;
  const validator = orderSchema.validate({ productsIds: teste });
  // console.log('req', req.body.productsIds);
  if (validator.error && validator.error.details[0].message.includes('required')) {
    return res.status(400).json({ message: validator.error.details[0].message });
  }
    
  if (validator.error) {
    console.log(validator.error);
    return res.status(422).json({ message: validator.error.details[0].message });
  }
  next();
};

export ={ orderMiddleware } ;