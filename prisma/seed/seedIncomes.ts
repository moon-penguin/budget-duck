import { Income } from '@prisma/client';
import { IncomeBuilder } from '../../tests/builder/Income.builder';
import prisma from '../../src/app/shared/database/prisma';

export async function seedIncomes() {
  await prisma.income.createMany({
    data: buildIncomes(),
  });
}

function buildIncomes(): Income[] {
  return [
    new IncomeBuilder().build(),
    new IncomeBuilder().build({
      id: 2,
      title: 'Present',
      value: 100,
      cycle: 'ONCE',
      category: ['present', 'birthday'],
      type: 'INCOME',
      date: new Date('2024/11/05'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];
}
