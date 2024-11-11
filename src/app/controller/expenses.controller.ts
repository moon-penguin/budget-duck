import { ExpenseRepository } from '../repository/expense.repository';
import { Expense } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

export class ExpensesController {
  private expenseRepository: ExpenseRepository;

  constructor(repository: ExpenseRepository) {
    this.expenseRepository = repository;
  }

  async findAllExpenses(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Expense[]> {
    try {
      reply.statusCode = 202;
      return await this.expenseRepository.findAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async findExpenseById(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Expense> {
    try {
      const id = Number(request.params['id']);
      const expense = await this.expenseRepository.findById(id);

      if (expense) {
        reply.statusCode = 200;
        return expense;
      } else {
        reply.notFound();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async createExpense(request: FastifyRequest, reply: FastifyReply) {
    try {
      const reqExpense = request.body as Expense;
      await this.expenseRepository.create({
        ...reqExpense,
        date: new Date(reqExpense.date),
        createdAt: new Date(reqExpense.createdAt),
        updatedAt: new Date(reqExpense.updatedAt),
      });
      reply.statusCode = 202;
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError(error.message);
      }
    }
  }

  async updateExpense(request: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number(request.params['id']);
      const reqExpense = request.body as Expense;

      if (id !== reqExpense.id) {
        return reply.badRequest();
      }

      const updatedExpense = await this.expenseRepository.update({
        ...reqExpense,
        date: new Date(reqExpense.date),
        createdAt: new Date(reqExpense.createdAt),
        updatedAt: new Date(reqExpense.updatedAt),
      });

      if (updatedExpense) {
        reply.statusCode = 202;
      } else {
        reply.notFound();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async deleteExpense(request: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number(request.params['id']);
      const reqExpense = request.body as Expense;

      if (id !== reqExpense.id) {
        return reply.badRequest();
      }

      await this.expenseRepository.delete({
        ...reqExpense,
        date: new Date(reqExpense.date),
        createdAt: new Date(reqExpense.createdAt),
        updatedAt: new Date(reqExpense.updatedAt),
      });
      reply.statusCode = 202;
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }
}
