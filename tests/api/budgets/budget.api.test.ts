import { FastifyInstance } from 'fastify';
import { afterEach, beforeEach, equal, test } from 'tap';
import { buildServer } from '../../helper/buildServer.helper';
import { PrismaClient } from '@prisma/client';
import { BudgetBuilder } from '../../builder/Budget.builder';
import { UserBuilder } from '../../builder/User.builder';
import { setupPrismaTestContainer } from '../../helper/testContainer.helper';

let server: FastifyInstance;
let prisma: PrismaClient;

beforeEach(async () => {
  server = await buildServer();
  prisma = await setupPrismaTestContainer();

  await prisma.$connect();
});

afterEach(async () => {
  await server.close();
  await prisma.$disconnect();
});

// TODO: config to link server to testcontainer instance
test('get all budgets of user', async () => {
  const response = await server.inject({
    method: 'GET',
    url: 'api/v1/users/1/budgets',
  });

  await prisma.user.create({
    data: new UserBuilder().build(),
  });
  await prisma.budget.create({
    data: new BudgetBuilder().build({
      title: 'Miau miau',
    }),
  });

  console.log(await prisma.budget.findMany());
});
