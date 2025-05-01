import { Expense } from '@prisma/client';
import { ExpenseDto } from '../dto/expense.dto';
import { TRANSACTION_TYPE } from '../../../../shared/types/transaction.type';

export class ExpenseMapper {
  static toDto(expense: Expense): ExpenseDto {
    return {
      id: expense.id,
      title: expense.title,
      category: expense.category,
      cycle: expense.cycle,
      type: TRANSACTION_TYPE.EXPENSE,
      value: expense.value,
      date: expense.date.toString(),
      createdAt: expense.createdAt.toString(),
      updatedAt: expense.updatedAt.toString(),
    };
  }

  static toEntity(expenseDto: ExpenseDto, userId: string): Expense {
    return {
      id: expenseDto.id,
      title: expenseDto.title,
      category: expenseDto.category,
      cycle: expenseDto.cycle,
      type: TRANSACTION_TYPE.EXPENSE,
      value: expenseDto.value,
      date: new Date(expenseDto.date),
      createdAt: new Date(expenseDto.createdAt),
      updatedAt: new Date(expenseDto.updatedAt),
      userId: userId,
    };
  }

  static toDtos(expenses: Expense[]): ExpenseDto[] {
    return expenses.map((expense) => this.toDto(expense));
  }
}
