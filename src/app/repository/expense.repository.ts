import { Expense, PrismaClient } from '@prisma/client';
import { logError } from '../utils/logError.utils';
import { handlePrimaError } from '../utils/handlePrimaError.util';

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
      handlePrimaError(error);
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
      handlePrimaError(error);
    }
  }

  async create(expense: Expense): Promise<Expense> {
    try {
      return await this.database.expense.create({
        data: expense,
      });
    } catch (error: unknown) {
      logError(error, 'expense repository');
      handlePrimaError(error);
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
      handlePrimaError(error);
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
      handlePrimaError(error);
    }
  }
}
