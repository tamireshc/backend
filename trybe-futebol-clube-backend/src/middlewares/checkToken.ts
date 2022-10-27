import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'teste';

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Token must be a valid token' });
  }
  jwt.verify(token, secret, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  });
};

export default checkToken;
