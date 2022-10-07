import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import loginService from '../services/loginService';

dotenv.config();

const secret:string = process.env.JWT_SECRET || 'teste';

const jwtConfig:object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const result = await loginService.login(user);
    // const { username, id } = message;
    console.log(result);
    if (!result.id) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }
    const token = jwt.sign(
      { data: { username: result.username, id: result.id } }, // arrumar
      secret,
      jwtConfig,
    );
    return res.status(200).json({ token });
  } catch (error:unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};
// https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript

export ={
  login,
};