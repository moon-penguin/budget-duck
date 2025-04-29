import { PrismaClient, User } from '@prisma/client';
import { logError } from '../../../shared/utils/logError.utils';
import prismaClient from '../../../shared/database/prisma';
import { PasswordManagerService } from '../services/password-manager.service';
import { CreateUserDto } from '../domain/dto/create-user.dto';

export class UserRepository {
  private readonly database: PrismaClient;
  private readonly passwordManager = new PasswordManagerService();

  constructor() {
    this.database = prismaClient;
  }

  async findUser(user: User): Promise<User | null> {
    try {
      return await this.database.user.findUnique({
        where: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error: unknown) {
      logError(error, 'user repository');
    }
  }

  async findUserById(id: string): Promise<User | null> {
    try {
      return await this.database.user.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error: unknown) {
      logError(error, 'user repository');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.database.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error: unknown) {
      logError(error, 'user repository');
    }
  }

  async create(user: CreateUserDto): Promise<User | null> {
    try {
      const hashedPassword = await this.passwordManager.generateHashedPassword(
        user.password
      );

      const createdUser = await this.database.user.create({
        data: { ...user, password: hashedPassword },
      });

      return createdUser;
    } catch (error: unknown) {
      logError(error, 'user repository');
    }
  }
}
