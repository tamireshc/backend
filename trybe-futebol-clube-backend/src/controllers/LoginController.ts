import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import bcrypt = require('bcryptjs');
import UserService from '../services/UserService';

require('dotenv/config');

const jwtConfig: object = {
  algorithm: 'HS256',
};
const secret = process.env.JWT_SECRET || 'teste';

export default class loginController {
  constructor(private userService: UserService) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await this.userService.findByEmail(email);

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
      const token = jwt.sign({ id: user.id, role: user.role }, secret, jwtConfig);

      return res.status(200).json({ token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  };

  public logiValidateRoute = (req: Request, res: Response) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Token não encontrado' });
    }
    try {
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
      const { role } = decoded;
      return res.status(200).json({ role });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  };
}
