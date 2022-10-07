import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IUser, IUserLogin } from '../interfaces/userInterface';
import connection from './connection';

const createUser = async (user:IUser):Promise<IUser> => {
  const [{ insertId }] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?,?,?,?)',
    [user.username, user.classe, user.level, user.password],
  );
  return { id: insertId, ...user };
};

const getUser = async (user:IUserLogin):Promise<IUser[] | []> => {
  const [userGet] = await connection.execute<IUser[] & RowDataPacket[]>(
    `
  SELECT * from Trybesmith.Users WHERE username =? AND password=?`,
    [user.username, user.password],
  );
  return userGet as IUser[] | [];
};

export ={
  createUser,
  getUser,
};