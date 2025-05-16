import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { FastifyInstance } from 'fastify';
import { UserBuilder } from '../../builder/User.builder';
import t from 'tap';
import {
  bootstrapTestEnvironment,
  closeTestEnvironment,
} from '../../helper/test-env.setup';
import { StartedRedisContainer } from '@testcontainers/redis';

let redisContainer: StartedRedisContainer;
let postgresContainer: StartedPostgreSqlContainer;
let server: FastifyInstance;

const userMock = new UserBuilder().build();

t.before(async () => {
  const { testRedisContainer, testPostgresContainer, testServer } =
    await bootstrapTestEnvironment();

  server = testServer;
  redisContainer = testRedisContainer;
  postgresContainer = testPostgresContainer;
});

t.after(async () => {
  await closeTestEnvironment(postgresContainer, redisContainer, server);
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
