import { PrismaClient } from '@prisma/client';
import { seedUser } from './seedUser';
import { seedIncomes } from './seedIncomes';
import { seedExpenses } from './seedExpenses';

const prisma = new PrismaClient();

async function seed() {
  try {
    await resetDB();
    await seedUser();
    await seedIncomes();
    await seedExpenses();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('[ seed db ] could not seed database');
    }
  }
}

async function resetDB() {
  await prisma.user.deleteMany();
  await prisma.income.deleteMany();
  await prisma.expense.deleteMany();
}

(async () => {
  await seed();
})();
