import { Static, Type } from '@sinclair/typebox';

const nodeConfigSchema = Type.Object({
  NODE_ENV: Type.Union([
    Type.Literal('development'),
    Type.Literal('production'),
    Type.Literal('test'),
  ]),
  HOST: Type.String({
    default: 'localhost',
  }),
  PORT: Type.Number({
    default: 3000,
  }),
});

const databaseConfigSchema = Type.Object({
  DB_PORT: Type.Number({ default: 5432 }),
  DB_NAME: Type.String({ default: 'budget_db' }),
  DB_USER: Type.String({ default: 'admin' }),
  DB_PASSWORD: Type.String({ default: 'test' }),
  DB_HOST: Type.String({ default: 'localhost' }),
});

const authConfigSchema = Type.Object({
  JWT_SECRET: Type.String({
    default: 'secret',
  }),
});

const prismaConfigSchema = Type.Object({
  DATABASE_URL: Type.String({
    default: 'postgresql://admin:test@localhost:5432/budget_db',
  }),
});

export const applicationEnvironmentConfigSchema = Type.Composite(
  [
    nodeConfigSchema,
    databaseConfigSchema,
    authConfigSchema,
    prismaConfigSchema,
  ],
  {
    $id: 'schema:application:environment:config',
    title: 'Application Environment Config',
    additionalProperties: false,
  }
);

export type ApplicationEnvironmentConfig = Static<
  typeof applicationEnvironmentConfigSchema
>;
