import { Expense, Prisma } from '@prisma/client';
import { logError } from '../../../shared/utils/logError.utils';
import { lastDayOfMonth, startOfMonth } from 'date-fns';
import prismaClient from '../../../shared/database/prisma';
import { CreateExpenseDto } from '../domain/dto/create-expense.dto';
import { PaginationQueryDto } from '../../../shared/schema/pagination-query.schema';

export class ExpenseService {
  private readonly database: Prisma.ExpenseDelegate;

  constructor() {
    this.database = prismaClient.expense;
  }

  async findAll(userId: string, paginationQuery: PaginationQueryDto) {
    try {
      const { limit, offset } = paginationQuery;
      return await this.database.findMany({
        orderBy: {
          id: 'asc',
        },
        where: {
          user: {
            id: userId,
          },
        },
        skip: offset,
        take: limit,
      });
    } catch (error: unknown) {
      logError(error, 'expense service');
    }
  }

  async findById(id: number, userId: string) {
    try {
      return await this.database.findUnique({
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
      logError(error, 'expense service');
    }
  }

  async create(expense: CreateExpenseDto, userId: string) {
    try {
      return await this.database.create({
        data: {
          ...expense,
          userId,
        },
      });
    } catch (error: unknown) {
      logError(error, 'expense service');
    }
  }

  async update(expense: Expense) {
    try {
      const recordToUpdate = await this.database.findUnique({
        where: {
          id: expense.id,
          AND: {
            userId: expense.userId,
          },
        },
      });

      if (!recordToUpdate) {
        return null;
      }

      return await this.database.update({
        data: expense,
        where: {
          id: recordToUpdate.id,
          AND: {
            userId: recordToUpdate.userId,
          },
        },
      });
    } catch (error: unknown) {
      logError(error, 'expense service');
    }
  }

  async delete(expense: Expense) {
    try {
      const recordToDelete = await this.database.findUnique({
        where: {
          id: expense.id,
          AND: {
            userId: expense.userId,
          },
        },
      });

      if (!recordToDelete) {
        return null;
      }
      return await this.database.delete({
        where: {
          id: recordToDelete.id,
          AND: {
            userId: recordToDelete.userId,
          },
        },
      });
    } catch (error: unknown) {
      logError(error, 'expense service');
    }
  }

  async findByMonth(month: Date, userId: string) {
    const firstDayOfCurrentMonth = startOfMonth(month);
    const lastDayOfCurrentMonth = lastDayOfMonth(month);

    try {
      return this.database.findMany({
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
      logError(error, 'expense service');
    }
  }
}
