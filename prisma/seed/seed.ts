import { Position, PrismaClient, User } from '@prisma/client';
import { PositionBuilder } from '../../src/app/builder/PositionBuilder.builder';
import { UserBuilder } from '../../src/app/builder/UserBuilder.builder';

const prisma = new PrismaClient();

async function seed() {
  try {
    await resetDB();
    await seedPositions();
    await seedUser();
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
      id: '2',
      title: 'Book',
      category: ['literature'],
      value: 25,
    }),
    new PositionBuilder().build({
      id: '3',
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

(async () => {
  await seed();
})();
