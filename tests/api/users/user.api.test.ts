import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { UserBuilder } from '../../builder/User.builder';
import t from 'tap';
import {
  initPostgresContainer,
  initTestServer,
  startRedisContainer,
} from '../../helper/test-env.setup';
import { clearDatabase } from '../../helper/prisma-orm.helper';
import { StartedRedisContainer } from '@testcontainers/redis';

let redisContainer: StartedRedisContainer;
let postgresContainer: StartedPostgreSqlContainer;
let server: FastifyInstance;
let prisma: PrismaClient;

const userMock = new UserBuilder().build();

t.before(async () => {
  redisContainer = await startRedisContainer();
  const { container, prismaOrm } = await initPostgresContainer();
  postgresContainer = container;
  prisma = prismaOrm;

  server = await initTestServer();
});

t.after(async () => {
  await clearDatabase(prisma);
  await server.close();
  await redisContainer.stop();
  await postgresContainer.stop();
});

t.test('should register a user', async () => {
  const response = await server.inject({
    method: 'POST',
    url: '/api/auth/register',
    body: {
      name: userMock.name,
      email: userMock.email,
      password: userMock.password,
    },
  });

  const createdUser = await prisma.user.findUnique({
    where: {
      email: userMock.email,
    },
  });

  t.equal(userMock.email, createdUser.email);
  t.equal(response.statusCode, 201);
  t.end();
});

t.test('should login the registered user', async () => {
  const response = await server.inject({
    method: 'POST',
    url: '/api/auth/login',
    body: {
      email: userMock.email,
      password: userMock.password,
    },
  });

  const token = response.json().refreshToken as string;

  t.equal(response.statusCode, 200);
  t.equal(!!token.length, true);
  t.end();
});
