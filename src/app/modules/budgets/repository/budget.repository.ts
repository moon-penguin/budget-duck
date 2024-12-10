import { Budget, PrismaClient } from '@prisma/client';
import { logError } from '../../../shared/utils/logError.utils';
import { handlePrismaError } from '../../../shared/utils/handlePrismaError';
import { lastDayOfMonth, startOfMonth } from 'date-fns';
import prismaClient from '../../../shared/database/prisma';

export class BudgetRepository {
  private database: PrismaClient;

  constructor() {
    this.database = prismaClient;
  }

  async findAll(userId: string): Promise<Budget[]> {
    try {
      return await this.database.budget.findMany({
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
      logError(error, 'budget repository');
      handlePrismaError(error);
    }
  }

  async findById(id: number, userId: string): Promise<Budget | null> {
    try {
      return await this.database.budget.findUnique({
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
      logError(error, 'budget repository');
      handlePrismaError(error);
    }
  }

  async create(budget: Budget): Promise<Budget> {
    try {
      return await this.database.budget.create({
        data: budget,
      });
    } catch (error: unknown) {
      logError(error, 'budget repository');
      handlePrismaError(error);
    }
  }

  async update(budget: Budget): Promise<Budget> {
    try {
      return await this.database.budget.update({
        data: budget,
        where: {
          id: budget.id,
        },
      });
    } catch (error: unknown) {
      logError(error, 'budget repository');
      handlePrismaError(error);
    }
  }

  async delete(budget: Budget): Promise<Budget> {
    try {
      return await this.database.budget.delete({
        where: {
          id: budget.id,
        },
      });
    } catch (error: unknown) {
      logError(error, 'budget repository');
      handlePrismaError(error);
    }
  }

  async findByMonth(month: Date, userId: string): Promise<Budget[]> {
    const firstDayOfCurrentMonth = startOfMonth(month);
    const lastDayOfCurrentMonth = lastDayOfMonth(month);

    try {
      return this.database.budget.findMany({
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
      logError(error, 'expense repository');
      handlePrismaError(error);
    }
  }
}
