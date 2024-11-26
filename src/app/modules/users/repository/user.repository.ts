import { PrismaClient, User } from '@prisma/client';
import { logError } from '../../../shared/utils/logError.utils';
import { handlePrismaError } from '../../../shared/utils/handlePrimaError.util';
import { hash } from 'bcrypt';

export class UserRepository {
  private database: PrismaClient;

  constructor(database: PrismaClient) {
    this.database = database;
  }

  async findUser(user: User): Promise<User> {
    try {
      return await this.database.user.findUnique({
        where: {
          id: user.id,
        },
      });
    } catch (error: unknown) {
      logError(error, 'user repository');
      handlePrismaError(error);
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
      handlePrismaError(error);
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
