import { Prisma } from '@prisma/client';

export function handlePrismaError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new Error('Ups');
  }
}
