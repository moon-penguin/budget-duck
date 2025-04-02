import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { PrismaClient } from '@prisma/client';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { ApplicationEnvironmentConfig } from '../../src/app/configuration/types/configuration.types';
import Fastify from 'fastify';
import { app } from '../../src/app/app';

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
  JWT_SECRET: 'secret',
};

export async function initTestServer() {
  const server = Fastify({
    logger: {
      level: 'error',
    },
    disableRequestLogging: true,
    ignoreDuplicateSlashes: true,
  });

  server.register(app);

  process.env.NODE_ENV = testApplicationConfig.NODE_ENV;
  process.env.HOST = testApplicationConfig.HOST;
  process.env.PORT = testApplicationConfig.PORT.toString();

  return server;
}

const execAsync = promisify(exec);

export async function initPostgresContainer() {
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
