import { FastifyInstance } from 'fastify';
import t from 'tap';
import { PrismaClient } from '@prisma/client';
import {
  initPostgresContainer,
  initTestServer,
} from '../../helper/test-env.setup';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { BudgetBuilder } from '../../builder/Budget.builder';
import { UserBuilder } from '../../builder/User.builder';
import { clearDatabase } from '../../helper/prisma-orm.helper';

let postgresContainer: StartedPostgreSqlContainer;
let server: FastifyInstance;
let prisma: PrismaClient;

const userMock = new UserBuilder().build();
const budgetMock = new BudgetBuilder().build({ userId: userMock.id });

t.before(async () => {
  const { container, prismaOrm } = await initPostgresContainer();
  postgresContainer = container;
  prisma = prismaOrm;

  server = await initTestServer();

  await prisma.user.create({ data: userMock });
  await prisma.budget.create({ data: budgetMock });
});

t.after(async () => {
  await clearDatabase(prisma);
  await server.close();
  await postgresContainer.stop();
});

t.test('get all budgets of user', async () => {
  const response = await server.inject({
    method: 'GET',
    url: 'api/v1/users/1/budgets',
  });

  const payload = response.json();

  t.equal(payload[0].id, budgetMock.id);
});
