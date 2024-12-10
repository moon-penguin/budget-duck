import { Expense } from '@prisma/client';
import { ExpenseDto } from '../dto/ExpenseDto';

export class ExpenseMapper {
  static toDto(expense: Expense): ExpenseDto {
    return {
      id: expense.id,
      title: expense.title,
      category: expense.category,
      cycle: expense.cycle,
      type: expense.type,
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
      type: expenseDto.type,
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
