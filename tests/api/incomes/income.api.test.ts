import { FastifyInstance } from 'fastify';
import t from 'tap';
import { PrismaClient } from '@prisma/client';
import {
  initPostgresContainer,
  initTestServer,
} from '../../helper/test-env.setup';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { UserBuilder } from '../../builder/User.builder';
import { clearDatabase } from '../../helper/prisma-orm.helper';
import { IncomeDto } from '../../../src/app/modules/incomes/domain/dto/income.dto';
import { CreateIncomeDto } from '../../../src/app/modules/incomes/domain/dto/create-income.dto';
import { TRANSACTION_TYPE } from '../../../src/app/shared/types/transaction.type';
import { authAndGetToken } from '../../helper/auth.helper';

let postgresContainer: StartedPostgreSqlContainer;
let server: FastifyInstance;
let prisma: PrismaClient;
let authToken: string;

const userMock = new UserBuilder().build();

t.before(async () => {
  const { container, prismaOrm } = await initPostgresContainer();
  postgresContainer = container;
  prisma = prismaOrm;

  server = await initTestServer();

  authToken = await authAndGetToken(server, userMock);
});

t.after(async () => {
  await clearDatabase(prisma);
  await server.close();
  await postgresContainer.stop();
});

t.test('create income', async () => {
  const createIncome: CreateIncomeDto = {
    date: new Date().toISOString(),
    category: ['communication'],
    type: TRANSACTION_TYPE.INCOME,
    cycle: 'ONCE',
    title: 'Smartphone Bonus',
    value: 20,
  };

  const createResponse = await server.inject({
    method: 'POST',
    url: '/api/incomes',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: createIncome,
  });

  const getIncomesResponse = await server.inject({
    method: 'GET',
    url: '/api/incomes',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const payload = getIncomesResponse.json() as IncomeDto[];

  t.equal(createResponse.statusCode, 201);
  t.equal(getIncomesResponse.statusCode, 202);
  t.equal(payload.length, 1);
  t.equal(payload[0].title, createIncome.title);
});
