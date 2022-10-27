import { IUserRepository } from '../entities/IUserRepository';
import { IUser } from '../entities/IUser';
import UserModel from '../database/models/User';

export default class UserRepository implements IUserRepository {
  private userModel = UserModel;

  public findByEmail = async (email: string): Promise<IUser | null> => {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) return null;
    return user;
  };
}
