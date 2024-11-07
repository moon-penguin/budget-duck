import { Budget, Position, PrismaClient, User } from '@prisma/client';
import { PositionBuilder } from '../../src/app/builder/PositionBuilder.builder';
import { UserBuilder } from '../../src/app/builder/UserBuilder.builder';
import { BudgetBuilder } from '../../src/app/builder/Budget.builder';

const prisma = new PrismaClient();

async function seed() {
  try {
    await resetDB();
    await seedPositions();
    await seedUser();
    await seedBudget();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('[ seed db ] could not seed database');
    }
  }
}

async function resetDB() {
  await prisma.position.deleteMany();
  await prisma.user.deleteMany();
}

async function seedPositions() {
  const positions: Position[] = [
    new PositionBuilder().build(),
    new PositionBuilder().build({
      id: 2,
      title: 'Book',
      category: ['literature'],
      value: 25,
    }),
    new PositionBuilder().build({
      id: 3,
      title: 'Tea',
      category: ['treat', 'joy'],
      value: 10,
    }),
  ];

  await prisma.position.createMany({
    data: positions,
  });
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
