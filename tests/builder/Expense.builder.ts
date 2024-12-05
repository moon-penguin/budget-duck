import { Expense } from '@prisma/client';

export class ExpenseBuilder {
  private expense: Expense = {
    id: 1,
    title: 'Smartphone',
    value: 1400,
    cycle: 'ONCE',
    category: ['communication'],
    type: 'EXPENSE',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),

    userId: '1',
  };

  build(meta?: Partial<Expense>) {
    return {
      ...this.expense,
      ...meta,
    };
  }
}
