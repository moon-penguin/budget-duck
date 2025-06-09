import { Prisma, User } from '@prisma/client';
import prismaClient from '../../../shared/database/prisma';
import { UserService } from '../../users/services/user.service';
import { RegisterUserDto } from '../domain/dtos/register-user.dto';
import { logError } from '../../../shared/utils/logError.utils';
import { PasswordManagerService } from './password-manager.service';
import { LoginUserDto } from '../domain/dtos/login-user.dto';

interface AuthenticationStatus {
  status: 'successful' | 'failed';
  message: string;
  data?: User;
}

export class AuthenticationService {
  private readonly userRepository: Prisma.UserDelegate;
  private readonly userService: UserService;
  private readonly passwordManagerService: PasswordManagerService;

  constructor() {
    this.userRepository = prismaClient.user;
    this.userService = new UserService();
    this.passwordManagerService = new PasswordManagerService();
  }

  async register(
    createUserDto: RegisterUserDto
  ): Promise<AuthenticationStatus> {
    try {
      const userAlreadyExists = await this.userService.findByMail(
        createUserDto.email
      );

      if (userAlreadyExists) {
        return {
          message: 'User already exists',
          status: 'failed',
        };
      }
      const hashedPassword =
        await this.passwordManagerService.generateHashedPassword(
          createUserDto.password
        );

      const userWithHashedPassword = await this.userRepository.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });

      return {
        data: userWithHashedPassword,
        status: 'successful',
        message: 'Registration successful',
      };
    } catch (error: unknown) {
      logError(error, 'authentication service');
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthenticationStatus> {
    try {
      const userRecord = await this.userService.findByMail(loginUserDto.email);

      if (!userRecord) {
        return {
          status: 'failed',
          message: 'User not found',
        };
      }

      const isPasswordValid =
        await this.passwordManagerService.comparePasswords(
          loginUserDto.password,
          userRecord.password
        );

      if (!isPasswordValid) {
        return {
          status: 'failed',
          message: 'Wrong password',
        };
      }

      return {
        status: 'successful',
        message: 'Login successful',
        data: userRecord,
      };
    } catch (error: unknown) {
      logError(error, 'authentication service');
    }
  }
}
