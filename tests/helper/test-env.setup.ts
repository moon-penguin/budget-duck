import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { PrismaClient } from '@prisma/client';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { ApplicationEnvironmentConfig } from '../../src/app/configuration/types/configuration.types';
import Fastify, { FastifyInstance } from 'fastify';
import { app } from '../../src/app/app';
import { RedisContainer, StartedRedisContainer } from '@testcontainers/redis';

type DatabaseConnectionConfig = {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
};

const testApplicationConfig: ApplicationEnvironmentConfig = {
  HOST: 'localhost',
  NODE_ENV: 'test',
  PORT: 3000,
  DB_HOST: 'localhost',
  DB_NAME: 'test_db',
  DB_USER: 'test',
  DB_PASSWORD: 'test',
  DB_PORT: 5432,
  DATABASE_URL: 'postgresql://test:test@localhost:5432/test_db',
  REDIS_PORT: 6379,
  REDIS_HOST: 'localhost',
  REDIS_PASSWORD: 'password',
  JWT_SECRET: 'secret',
  JWT_EXPIRE_IN: '24h',
  JWT_TOKEN_ISSUER: 'localhost',
  JWT_TOKEN_AUDIENCE: 'localhost',
  JWT_REFRESH_TOKEN_TTL: '24h',
  JWT_ACCESS_TOKEN_TTL: 86400,
  RATE_LIMIT_MAX: 4,
  COOKIE_NAME: 'cookie',
  COOKIE_SECRET: 'cookie_secret',
  COOKIE_SECURED: true,
};

async function initTestServer() {
  const server = Fastify({
    logger: {
      level: 'error',
    },
    disableRequestLogging: true,
    ignoreDuplicateSlashes: true,
  });

  await server.register(app);

  process.env.NODE_ENV = testApplicationConfig.NODE_ENV;
  process.env.HOST = testApplicationConfig.HOST;
  process.env.PORT = testApplicationConfig.PORT.toString();

  return server;
}

const execAsync = promisify(exec);

async function initPostgresContainer() {
  const container = await new PostgreSqlContainer()
    .withEnvironment({
      POSTGRES_USER: testApplicationConfig.DB_USER,
      POSTGRES_PASSWORD: testApplicationConfig.DB_PASSWORD,
      POSTGRES_DB: testApplicationConfig.DB_NAME,
      POSTGRES_HOST: testApplicationConfig.DB_HOST,
    })
    .withExposedPorts(testApplicationConfig.DB_PORT)
    .start();

  const host = container.getHost();
  const port = container.getMappedPort(testApplicationConfig.DB_PORT);

  const databaseUrl = buildDatabaseUrlFrom({
    host,
    port,
    name: container.getDatabase(),
    password: container.getPassword(),
    user: container.getUsername(),
  });

  process.env.DATABASE_URL = databaseUrl;
  process.env.DB_PORT = port.toString();
  process.env.DB_HOST = host;
  process.env.DB_USER = container.getUsername();
  process.env.DB_NAME = container.getDatabase();
  process.env.DB_PASSWORT = container.getPassword();

  const prisma = await startPrismaClient(databaseUrl);

  return { container, prismaOrm: prisma };
}

async function startPrismaClient(databaseUrl: string) {
  try {
    await execAsync(`DATABASE_URL=${databaseUrl} npx prisma migrate dev`);

    return new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error('Error in startPrismaClient');
    }
  }
}

function buildDatabaseUrlFrom(config: DatabaseConnectionConfig) {
  return `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.name}`;
}

async function startRedisContainer() {
  const container = await new RedisContainer()
    .withEnvironment({
      REDIS_HOST: testApplicationConfig.REDIS_HOST,
      REDIS_PORT: testApplicationConfig.REDIS_PORT.toString(),
    })
    .withExposedPorts(testApplicationConfig.REDIS_PORT)
    .start();

  const host = container.getHost();
  const port = container.getPort();

  process.env.REDIS_HOST = host;
  process.env.REDIS_PORT = port.toString();

  return container;
}

export async function bootstrapTestEnvironment() {
  const { container: testPostgresContainer } = await initPostgresContainer();
  const testRedisContainer = await startRedisContainer();

  const testServer = await initTestServer();

  return { testPostgresContainer, testRedisContainer, testServer };
}

export async function closeTestEnvironment(
  postgresContainer: StartedPostgreSqlContainer,
  redisContainer: StartedRedisContainer,
  server: FastifyInstance
) {
  await postgresContainer.stop();
  await redisContainer.stop();
  await server.close();
}
