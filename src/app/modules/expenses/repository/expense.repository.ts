import { Expense, PrismaClient } from '@prisma/client';
import { logError } from '../../../shared/utils/logError.utils';
import { lastDayOfMonth, startOfMonth } from 'date-fns';
import prismaClient from '../../../shared/database/prisma';
import { CreateExpenseDto } from '../domain/dto/create-expense.dto';
import { PaginationQueryDto } from '../../../shared/schema/pagination-query.schema';

export class ExpenseRepository {
  private database: PrismaClient;

  constructor() {
    this.database = prismaClient;
  }

  async findAll(
    userId: string,
    paginationQuery: PaginationQueryDto
  ): Promise<Expense[]> {
    try {
      const { limit, offset } = paginationQuery;
      return await this.database.expense.findMany({
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
      logError(error, 'expense repository');
    }
  }

  async findById(id: number, userId: string): Promise<Expense | null> {
    try {
      return await this.database.expense.findUnique({
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
      logError(error, 'expense repository');
    }
  }

  async create(expense: CreateExpenseDto, userId: string): Promise<Expense> {
    try {
      return await this.database.expense.create({
        data: {
          ...expense,
          userId,
        },
      });
    } catch (error: unknown) {
      logError(error, 'expense repository');
    }
  }

  async update(expense: Expense): Promise<Expense> {
    try {
      return await this.database.expense.update({
        data: expense,
        where: {
          id: expense.id,
          AND: {
            userId: expense.userId,
          },
        },
      });
    } catch (error: unknown) {
      logError(error, 'expense repository');
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
    }
  }

  async findByMonth(month: Date, userId: string): Promise<Expense[]> {
    const firstDayOfCurrentMonth = startOfMonth(month);
    const lastDayOfCurrentMonth = lastDayOfMonth(month);

    try {
      return this.database.expense.findMany({
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
    }
  }
}
