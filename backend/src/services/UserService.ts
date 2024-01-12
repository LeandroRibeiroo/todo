import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { AppDataSource } from '../data-source';
import { hashPassword } from '../helpers/passwordHelper';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository('User');
  }

  async createUser(userData: Partial<User>) {
    const newUser = this.userRepository.create(userData);

    if (!newUser) {
      throw new Error('User could not be created.');
    }

    newUser.password = await hashPassword(newUser.password);

    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  async updateUser(id: string, userData: Partial<User>) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found.');
    }

    const updatedUser = this.userRepository.update(user, userData);

    return updatedUser;
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found.');
    }

    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found.');
    }

    const deletedUser = await this.userRepository.delete(user);

    return deletedUser;
  }
}
