import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { generateAuthToken } from '../helpers/generateTokenHelper';

export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository('User');
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (!user) {
      throw new Error('Login Service: User could not be found.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Login Service: Password does not match.');
    }

    const tokens = generateAuthToken(user.userId);

    await this.userRepository.save({
      ...user,
      refreshToken: tokens.refreshToken,
    });

    return {
      userId: user.userId,
      token: tokens.token,
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    const user = await this.userRepository.findOne({
      where: { refreshToken },
    });

    if (!user) {
      throw new Error('Refresh Token Service: User could not be found.');
    }

    const isRefreshTokenValid = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET ?? '',
    );

    if (!isRefreshTokenValid) {
      throw new Error('Refresh Token Service: Refresh token is not valid.');
    }

    const tokens = generateAuthToken(user.userId);

    await this.userRepository.save({
      ...user,
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }
}
