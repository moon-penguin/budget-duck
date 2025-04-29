import { UserRepository } from '../repository/user.repository';
import { PasswordManagerService } from './password-manager.service';
import { User } from '@prisma/client';

export class UserService {
  private readonly userRepository: UserRepository;
  private readonly passwordManager: PasswordManagerService;

  constructor() {
    this.userRepository = new UserRepository();
    this.passwordManager = new PasswordManagerService();
  }

  async verifyUserById(userId: string) {
    const isVerified = await this.userRepository.findUserById(userId);
    return !!isVerified;
  }

  async verfiyUserByEmail(email: string) {
    const isVerified = await this.userRepository.findByEmail(email);
    return !!isVerified;
  }

  async verifyUser(user: User) {
    const isVerified = await this.userRepository.findUser(user);
    return !!isVerified;
  }

  async verifyPassword(password: string, hashedPassword: string) {
    const result = await this.passwordManager.comparePasswords(
      password,
      hashedPassword
    );
    return result;
  }
}
