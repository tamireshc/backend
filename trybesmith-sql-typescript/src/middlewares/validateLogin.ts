import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const userSchema = Joi.object({
  username: Joi.string().required()
    .messages({
      'string.empty': '"username" is required',

    }),
  password: Joi.string().required()
    .messages({
      'string.empty': '"password" is required',

    }),

});

const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const validator = userSchema.validate(req.body);
  if (validator.error) {
    return res.status(400).json({ message: validator.error.details[0].message });
  }
  next();
};

export ={ userMiddleware } ;