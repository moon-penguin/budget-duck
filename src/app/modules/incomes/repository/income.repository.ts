import { Income, PrismaClient } from '@prisma/client';
import { lastDayOfMonth, startOfMonth } from 'date-fns';
import { logError } from '../../../shared/utils/logError.utils';
import prismaClient from '../../../shared/database/prisma';

export class IncomeRepository {
  private database: PrismaClient;

  constructor() {
    this.database = prismaClient;
  }

  async findAll(userId: string): Promise<Income[]> {
    try {
      return await this.database.income.findMany({
        orderBy: {
          id: 'asc',
        },
        where: {
          user: {
            id: userId,
          },
        },
      });
    } catch (error: unknown) {
      logError(error, 'income repository');
    }
  }

  async findById(id: number, userId: string): Promise<Income | null> {
    try {
      return await this.database.income.findUnique({
        where: {
          id: id,
          AND: {
            user: {
              id: userId,
            },
          },
        },
      });
    } catch (error: unknown) {
      logError(error, 'income repository');
    }
  }

  async create(income: Income): Promise<Income> {
    try {
      return await this.database.income.create({
        data: income,
      });
    } catch (error: unknown) {
      logError(error, 'income repository');
    }
  }

  async update(income: Income): Promise<Income> {
    try {
      return await this.database.income.update({
        data: income,
        where: {
          id: income.id,
        },
      });
    } catch (error: unknown) {
      logError(error, 'income repository');
    }
  }

  async delete(income: Income): Promise<Income> {
    try {
      return await this.database.income.delete({
        where: {
          id: income.id,
        },
      });
    } catch (error: unknown) {
      logError(error, 'income repository');
    }
  }

  async findByMonth(month: Date, userId: string): Promise<Income[]> {
    const firstDayOfCurrentMonth = startOfMonth(month);
    const lastDayOfCurrentMonth = lastDayOfMonth(month);

    try {
      return this.database.income.findMany({
        where: {
          date: {
            gte: firstDayOfCurrentMonth,
            lte: lastDayOfCurrentMonth,
          },
          AND: {
            user: {
              id: userId,
            },
          },
        },
      });
    } catch (error: unknown) {
      logError(error, 'income repository');
    }
  }
}
