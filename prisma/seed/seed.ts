import { PrismaClient } from '@prisma/client';
import { seedUser } from './seedUser';
import { seedBudgets } from './seedBudgets';
import { seedExpenses } from './seedExpenses';

const prisma = new PrismaClient();

async function seed() {
  try {
    await resetDB();
    await seedUser();
    await seedBudgets();
    await seedExpenses();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('[ seed db ] could not seed database');
    }
  }
}

async function resetDB() {
  await prisma.user.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.expense.deleteMany();
}

(async () => {
  await seed();
})();
