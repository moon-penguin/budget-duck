import { PrismaClient, User } from '@prisma/client';
import { logError } from '../../../shared/utils/logError.utils';
import { hash } from 'bcrypt';
import prismaClient from '../../../shared/database/prisma';

export class UserRepository {
  private database: PrismaClient = prismaClient;

  constructor() {
    this.database = prismaClient;
  }

  async findUser(user: User): Promise<User | null> {
    try {
      return await this.database.user.findUnique({
        where: {
          id: user.id,
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

  async create(user: User): Promise<void> {
    try {
      const userWithHashedPassword = await this.getUserWithHashedPassword(user);

      await this.database.user.create({
        data: { ...userWithHashedPassword },
      });
    } catch (error: unknown) {
      logError(error, 'user repository');
    }
  }

  private async getUserWithHashedPassword(user: User): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await hash(user.password, saltRounds);

    return {
      ...user,
      password: hashedPassword,
    };
  }
}
