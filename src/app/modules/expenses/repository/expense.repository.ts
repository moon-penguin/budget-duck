import { Expense, PrismaClient } from '@prisma/client';
import { logError } from '../../../shared/utils/logError.utils';
import { handlePrismaError } from '../../../shared/utils/handlePrimaError.util';

export class ExpenseRepository {
  private database: PrismaClient;

  constructor(database: PrismaClient) {
    this.database = database;
  }

  async findAll(): Promise<Expense[]> {
    try {
      return await this.database.expense.findMany({
        orderBy: {
          id: 'asc',
        },
      });
    } catch (error: unknown) {
      logError(error, 'expense repository');
      handlePrismaError(error);
    }
  }

  async findById(id: number): Promise<Expense> {
    try {
      return await this.database.expense.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error: unknown) {
      logError(error, 'expense repository');
      handlePrismaError(error);
    }
  }

  async create(expense: Expense): Promise<Expense> {
    try {
      return await this.database.expense.create({
        data: expense,
      });
    } catch (error: unknown) {
      logError(error, 'expense repository');
      handlePrismaError(error);
    }
  }

  async update(expense: Expense): Promise<Expense> {
    try {
      return await this.database.expense.update({
        data: expense,
        where: {
          id: expense.id,
        },
      });
    } catch (error: unknown) {
      logError(error, 'expense repository');
      handlePrismaError(error);
    }
  }

  async delete(expense: Expense): Promise<Expense> {
    try {
      return await this.database.expense.delete({
        where: {
          id: expense.id,
        },
      });
    } catch (error: unknown) {
      logError(error, 'expense repository');
      handlePrismaError(error);
    }
  }
}
