import { IUser } from '../interfaces/userInterface';
import userModel from '../models/userModel';

const createUser = async (user:IUser):Promise<IUser> => {
  const newUser = await userModel.createUser(user);
  return newUser;
};

export ={
  createUser,
};