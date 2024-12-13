import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { PrismaClient } from '@prisma/client';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';

type ConnectionConfig = {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
};

const execAsync = promisify(exec);

async function setupPostgresTestingContainer() {
  const container = await new PostgreSqlContainer('postgres').start();

  const connectionConfig: ConnectionConfig = {
    host: container.getHost(),
    port: container.getMappedPort(5432),
    database: container.getDatabase(),
    user: container.getUsername(),
    password: container.getPassword(),
  };

  return connectionConfig;
}

export async function setupPrismaTestContainer() {
  const connectionConfig = await setupPostgresTestingContainer();
  const databaseUrl = `postgresql://${connectionConfig.user}:${connectionConfig.password}@${connectionConfig.host}:${connectionConfig.port}/${connectionConfig.database}`;

  await execAsync(
    `DATABASE_URL=${databaseUrl} npx prisma migrate deploy --preview-feature`
  );

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

  return prisma;
}
