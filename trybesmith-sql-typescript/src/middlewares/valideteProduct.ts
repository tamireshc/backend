import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const productSchema = Joi.object({
  name: Joi.string().min(2).required()
    .messages({
      'string.empty': '"name" is required',
      'string.base': '"name" must be a string',
      'string.min': '"name" length must be at least 3 characters long',

    }),
  amount: Joi.string().min(2).required()
    .messages({
      'string.empty': '"amount" is required',
      'string.base': '"amount" must be a string',
      'string.min': '"amount" length must be at least 3 characters long',

    }),

});

const productMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const validator = productSchema.validate(req.body);
  if (validator.error && validator.error.details[0].message.includes('required')) {
    return res.status(400).json({ message: validator.error.details[0].message });
  }
  
  if (validator.error) {
    return res.status(422).json({ message: validator.error.details[0].message });
  }
  next();
};

export ={ productMiddleware } ;