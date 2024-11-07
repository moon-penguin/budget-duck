import { Prisma } from '@prisma/client';

export function handlePrimaError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new Error('Ups');
  }
}
