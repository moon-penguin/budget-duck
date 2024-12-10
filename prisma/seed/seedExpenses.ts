import { Expense } from '@prisma/client';
import { ExpenseBuilder } from '../../tests/builder/Expense.builder';
import prisma from '../../src/app/shared/database/prisma';

export async function seedExpenses() {
  await prisma.expense.createMany({
    data: buildExpenses(),
  });
}

function buildExpenses(): Expense[] {
  return [
    new ExpenseBuilder().build(),
    new ExpenseBuilder().build({
      id: 2,
      title: 'Bicycle',
      value: 1700,
      category: ['transportation'],
    }),
  ];
}
