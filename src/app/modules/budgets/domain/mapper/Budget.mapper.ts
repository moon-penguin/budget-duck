import { BudgetDto } from '../dto/BudgetDto';
import { Budget } from '@prisma/client';

export class BudgetMapper {
  static toDto(budget: Budget): BudgetDto {
    return {
      id: budget.id,
      title: budget.title,
      category: budget.category,
      cycle: budget.cycle,
      type: budget.type,
      value: budget.value,
      date: budget.date.toString(),
      createdAt: budget.createdAt.toString(),
      updatedAt: budget.updatedAt.toString(),
    };
  }

  static toEntity(budgetDto: BudgetDto, userId: string): Budget {
    return {
      id: budgetDto.id,
      title: budgetDto.title,
      category: budgetDto.category,
      cycle: budgetDto.cycle,
      type: budgetDto.type,
      value: budgetDto.value,
      date: new Date(budgetDto.date),
      createdAt: new Date(budgetDto.createdAt),
      updatedAt: new Date(budgetDto.updatedAt),
      userId: userId,
    };
  }
}
