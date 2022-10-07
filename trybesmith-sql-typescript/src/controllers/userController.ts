import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userService from '../services/userService';

dotenv.config();

const secret:string = process.env.JWT_SECRET || 'teste';

const jwtConfig:object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const newUser = await userService.createUser(user);
    const token = jwt.sign(
      { data: { username: newUser.username, userId: newUser.id } },
      secret,
      jwtConfig,
    );
    return res.status(201).json({ token });
  } catch (error:unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};
// https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
export ={
  createUser,
};
