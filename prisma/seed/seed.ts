import { Budget, PrismaClient, User } from '@prisma/client';
import { UserBuilder } from '../../tests/builder/User.builder';
import { BudgetBuilder } from '../../tests/builder/Budget.builder';

const prisma = new PrismaClient();

async function seed() {
  try {
    await resetDB();
    await seedUser();
    await seedBudget();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('[ seed db ] could not seed database');
    }
  }
}

async function resetDB() {
  await prisma.user.deleteMany();
  await prisma.budget.deleteMany();
}

async function seedUser() {
  const user: User[] = [new UserBuilder().build()];

  await prisma.user.createMany({
    data: user,
  });
}

async function seedBudget() {
  const budgets: Budget[] = [
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

  await prisma.budget.createMany({
    data: budgets,
  });
}

(async () => {
  await seed();
})();
