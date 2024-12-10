import { Budget } from '@prisma/client';
import { BudgetBuilder } from '../../tests/builder/Budget.builder';
import prisma from '../../src/app/shared/database/prisma';

export async function seedBudgets() {
  await prisma.budget.createMany({
    data: buildBudgets(),
  });
}

function buildBudgets(): Budget[] {
  return [
    new BudgetBuilder().build(),
    new BudgetBuilder().build({
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
