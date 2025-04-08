import { FastifyInstance } from 'fastify';
import t from 'tap';
import { PrismaClient } from '@prisma/client';
import {
  initPostgresContainer,
  initTestServer,
} from '../../helper/test-env.setup';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { IncomeBuilder } from '../../builder/Income.builder';
import { UserBuilder } from '../../builder/User.builder';
import { clearDatabase } from '../../helper/prisma-orm.helper';
import { IncomeDto } from '../../../src/app/modules/incomes/domain/dto/IncomeDto';

let postgresContainer: StartedPostgreSqlContainer;
let server: FastifyInstance;
let prisma: PrismaClient;

const userMock = new UserBuilder().build();
const incomeMock = new IncomeBuilder().build({ userId: userMock.id });

t.before(async () => {
  const { container, prismaOrm } = await initPostgresContainer();
  postgresContainer = container;
  prisma = prismaOrm;

  server = await initTestServer();

  await prisma.user.create({ data: userMock });
  await prisma.income.create({ data: incomeMock });
});

t.after(async () => {
  await clearDatabase(prisma);
  await server.close();
  await postgresContainer.stop();
});

t.test('get all incomes of user', async () => {
  const response = await server.inject({
    method: 'GET',
    url: 'api/v1/users/1/incomes',
  });

  const payload = response.json() as IncomeDto[];

  t.equal(payload[0].id, incomeMock.id);
  t.equal(payload.length, 1);
});
