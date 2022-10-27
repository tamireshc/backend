import { NextFunction, Request, Response } from 'express';

import Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'All fields must be filled',
    'string.email': 'Incorrect email or password',
  }),

  password: Joi.string().messages({
    'string.empty': 'All fields must be filled',
  }),

});

const loginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const validator = loginSchema.validate(req.body);
  if (validator.error && validator.error.details[0].message.includes('email')) {
    return res.status(401).json({ message: validator.error.details[0].message });
  }
  if (validator.error) {
    return res.status(400).json({ message: validator.error.details[0].message });
  }
  next();
};

export default loginMiddleware;
