import { Prisma } from '@prisma/client';
import prismaClient from '../../../shared/database/prisma';
import { logError } from '../../../shared/utils/logError.utils';

export class UserService {
  private readonly database: Prisma.UserDelegate;

  constructor() {
    this.database = prismaClient.user;
  }

  async findByMail(email: string) {
    try {
      return await this.database.findUnique({
        where: {
          email,
        },
      });
    } catch (error: unknown) {
      logError(error, 'user service');
    }
  }
}
