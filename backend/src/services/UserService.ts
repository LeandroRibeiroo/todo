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
      throw new Error('User Service: User could not be created.');
    }

    newUser.password = await hashPassword(newUser.password);

    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  async updateUser(userId: string, userData: Partial<User>) {
    const updatedUser = this.userRepository.update({ userId }, userData);

    if (!updatedUser) {
      throw new Error('User Service: User could not be updated.');
    }

    return updatedUser;
  }

  async getUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['tasks'],
    });

    if (!user) {
      throw new Error('User Service: User could not be found.');
    }

    return user;
  }

  async deleteUser(userId: string) {
    const deletedUser = await this.userRepository.delete({ userId });

    if (!deletedUser) {
      throw new Error('User Service: User could not be deleted.');
    }

    return deletedUser;
  }
}
