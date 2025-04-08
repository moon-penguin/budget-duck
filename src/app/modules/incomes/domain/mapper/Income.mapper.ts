import { IncomeDto } from '../dto/IncomeDto';
import { Income } from '@prisma/client';

export class IncomeMapper {
  static toDto(income: Income): IncomeDto {
    return {
      id: income.id,
      title: income.title,
      category: income.category,
      cycle: income.cycle,
      type: income.type,
      value: income.value,
      date: income.date.toString(),
      createdAt: income.createdAt.toString(),
      updatedAt: income.updatedAt.toString(),
    };
  }

  static toEntity(incomeDto: IncomeDto, userId: string): Income {
    return {
      id: incomeDto.id,
      title: incomeDto.title,
      category: incomeDto.category,
      cycle: incomeDto.cycle,
      type: incomeDto.type,
      value: incomeDto.value,
      date: new Date(incomeDto.date),
      createdAt: new Date(incomeDto.createdAt),
      updatedAt: new Date(incomeDto.updatedAt),
      userId: userId,
    };
  }

  static toDtos(incomes: Income[]): IncomeDto[] {
    return incomes.map((income) => this.toDto(income));
  }
}
