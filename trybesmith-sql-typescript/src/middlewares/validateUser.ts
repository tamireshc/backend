import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const userSchema = Joi.object({
  username: Joi.string().min(3).required()
    .messages({
      'string.empty': '"username" is required',
      'string.base': '"username" must be a string',
      'string.min': '"username" length must be at least 3 characters long',

    }),
  classe: Joi.string().min(3).required()
    .messages({
      'string.empty': '"classe" is required',
      'string.base': '"classe" must be a string',
      'string.min': '"classe" length must be at least 3 characters long',

    }),
  level: Joi.number().min(1).required()
    .messages({
      'string.empty': '"level" is required',
      'string.base': '"level" must be a number',
      'string.min': '"level" must be greater than or equal to 1',

    }),
  password: Joi.string().min(8).required()
    .messages({
      'string.empty': '"password" is required',
      'string.base': '"password" must be a string',
      'string.min': '"password" length must be at least 8 characters long',

    }),

});

const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const validator = userSchema.validate(req.body);
  if (validator.error && validator.error.details[0].message.includes('required')) {
    return res.status(400).json({ message: validator.error.details[0].message });
  }
  
  if (validator.error) {
    return res.status(422).json({ message: validator.error.details[0].message });
  }
  next();
};

export ={ userMiddleware } ;