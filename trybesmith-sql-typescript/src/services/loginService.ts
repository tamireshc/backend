import { IUserLogin } from '../interfaces/userInterface';
import userModel from '../models/userModel';

const login = async (user:IUserLogin) => {
  const userGet = await userModel.getUser(user);
  // console.log('service', userGet[0].id);
  if (!userGet[0]) {
    return { id: undefined, username: undefined };
  } 
  return { id: userGet[0].id, username: userGet[0].username };
};

export ={
  login,
};