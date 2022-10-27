// import { Model } from 'sequelize/types';
import { IUser } from './IUser';

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>

}
