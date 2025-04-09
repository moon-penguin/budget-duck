import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { UserBuilder } from '../../builder/User.builder';
import t from 'tap';
import {
  initPostgresContainer,
  initTestServer,
} from '../../helper/test-env.setup';
import { clearDatabase } from '../../helper/prisma-orm.helper';

let postgresContainer: StartedPostgreSqlContainer;
let server: FastifyInstance;
let prisma: PrismaClient;

const userMock = new UserBuilder().build();

t.before(async () => {
  const { container, prismaOrm } = await initPostgresContainer();
  postgresContainer = container;
  prisma = prismaOrm;

  server = await initTestServer();
});

t.after(async () => {
  await clearDatabase(prisma);
  await server.close();
  await postgresContainer.stop();
});

t.test('should create user in database when registered', async () => {
  const response = await server.inject({
    method: 'POST',
    url: 'api/auth/register',
    body: userMock,
  });

  const createdUser = await prisma.user.findUnique({
    where: {
      id: userMock.id,
    },
  });

  t.equal(userMock.id, createdUser.id);
  t.equal(response.statusCode, 201);
});
