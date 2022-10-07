import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

const secret:string = process.env.JWT_SECRET || 'teste';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const decoded:jwt.JwtPayload | string = jwt.verify(token, secret);
        
    req.body = { ...req.body, decoded };
  } catch (error:unknown) {
    if (error instanceof Error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
 
  next();
};

export ={
  validateToken,
};