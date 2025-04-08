import { PrismaClient } from '@prisma/client';

export async function clearDatabase(prisma: PrismaClient) {
  await prisma.expense.deleteMany();
  await prisma.income.deleteMany();
  await prisma.user.deleteMany();
}
