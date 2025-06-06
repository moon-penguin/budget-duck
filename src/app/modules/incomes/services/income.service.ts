import { Income, Prisma } from '@prisma/client';
import { lastDayOfMonth, startOfMonth } from 'date-fns';
import { logError } from '../../../shared/utils/logError.utils';
import prismaClient from '../../../shared/database/prisma';
import { CreateIncomeDto } from '../domain/dto/create-income.dto';
import { PaginationQueryDto } from '../../../shared/schema/pagination-query.schema';

export class IncomeService {
  private readonly database: Prisma.IncomeDelegate;

  constructor() {
    this.database = prismaClient.income;
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
      logError(error, 'income service');
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
      logError(error, 'income service');
    }
  }

  async create(income: CreateIncomeDto, userId: string): Promise<Income> {
    try {
      return await this.database.create({
        data: {
          ...income,
          userId,
        },
      });
    } catch (error: unknown) {
      logError(error, 'income service');
    }
  }

  async update(income: Income): Promise<Income> {
    try {
      const recordToUpdate = await this.database.findUnique({
        where: {
          id: income.id,
          AND: {
            userId: income.userId,
          },
        },
      });

      if (!recordToUpdate) {
        return null;
      }

      return await this.database.update({
        data: income,
        where: {
          id: recordToUpdate.id,
          AND: {
            userId: recordToUpdate.userId,
          },
        },
      });
    } catch (error: unknown) {
      logError(error, 'income service');
    }
  }

  async delete(income: Income): Promise<Income> {
    try {
      const recordToDelete = await this.database.findUnique({
        where: {
          id: income.id,
          AND: {
            userId: income.userId,
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
      logError(error, 'income service');
    }
  }

  async findByMonth(month: Date, userId: string): Promise<Income[]> {
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
      logError(error, 'income service');
    }
  }
}
