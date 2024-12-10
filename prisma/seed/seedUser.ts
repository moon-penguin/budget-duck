import { User } from '@prisma/client';
import { UserBuilder } from '../../tests/builder/User.builder';
import prisma from '../../src/app/shared/database/prisma';

export async function seedUser() {
  await prisma.user.createMany({ data: buildUsers() });
}

function buildUsers(): User[] {
  return [
    new UserBuilder().build(),
    new UserBuilder().build({
      id: '2',
      name: 'Aandra Miro',
      email: 'andra@miro.eu',
    }),
    new UserBuilder().build({
      id: '3',
      name: 'Bberon Ebe',
      email: 'bberon@ebe.org',
    }),
  ];
}
