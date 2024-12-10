import { Budget } from '@prisma/client';

export class BudgetBuilder {
  private budget: Budget = {
    id: 1,
    title: 'Grandma Present',
    value: 100,
    category: ['present', 'family', 'birthday'],
    date: new Date('2024/11/05'),
    type: 'INCOME',
    cycle: 'YEARLY',
    createdAt: new Date(),
    updatedAt: new Date(),

    userId: '1',
  };

  build(meta?: Partial<Budget>) {
    return {
      ...this.budget,
      ...meta,
    };
  }
}
