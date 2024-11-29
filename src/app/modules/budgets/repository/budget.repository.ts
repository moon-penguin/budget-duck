import { Budget, PrismaClient } from '@prisma/client';
import { logError } from '../../../shared/utils/logError.utils';
import { handlePrismaError } from '../../../shared/utils/handlePrimaError.util';
import { lastDayOfMonth, startOfMonth } from 'date-fns';

export class BudgetRepository {
  private database: PrismaClient;

  constructor(database: PrismaClient) {
    this.database = database;
  }

  async findAll(): Promise<Budget[]> {
    try {
      return await this.database.budget.findMany({
        orderBy: {
          id: 'asc',
        },
      });
    } catch (error: unknown) {
      logError(error, 'budget repository');
      handlePrismaError(error);
    }
  }

  async findById(id: number): Promise<Budget> {
    try {
      return await this.database.budget.findUnique({
        where: {
          id: id,
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

  async findByMonth(month: Date): Promise<Budget[]> {
    const firstDayOfCurrentMonth = startOfMonth(month);
    const lastDayOfCurrentMonth = lastDayOfMonth(month);

    try {
      return this.database.budget.findMany({
        where: {
          date: {
            gte: firstDayOfCurrentMonth,
            lte: lastDayOfCurrentMonth,
          },
        },
      });
    } catch (error: unknown) {
      logError(error, 'expense repository');
      handlePrismaError(error);
    }
  }
}
