import UserRepository from '../repositories/UserRepository';
import { IUser } from '../entities/IUser';

export default class UserService {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public findByEmail = async (email: string): Promise<IUser | null> => {
    const user = await this._userRepository.findByEmail(email);
    return user;
  };
}
