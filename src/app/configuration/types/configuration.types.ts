import { Static, Type } from '@sinclair/typebox';

const nodeConfigSchema = Type.Object({
  NODE_ENV: Type.Union(
    [
      Type.Literal('development'),
      Type.Literal('production'),
      Type.Literal('test'),
    ],
    { default: 'production' }
  ),
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

const jwtConfigSchema = Type.Object({
  JWT_SECRET: Type.String(),
  JWT_EXPIRE_IN: Type.String({ default: '5min' }),
  JWT_ACCESS_TOKEN_TTL: Type.Number({ default: 3600 }),
  JWT_REFRESH_TOKEN_TTL: Type.String({ default: '24h' }),
  JWT_TOKEN_ISSUER: Type.String({
    default: 'localhost',
  }),
  JWT_TOKEN_AUDIENCE: Type.String({
    default: 'localhost',
  }),
});

const cookieConfigSchema = Type.Object({
  COOKIE_NAME: Type.String(),
  COOKIE_SECRET: Type.String(),
  COOKIE_SECURED: Type.Boolean({
    default: true,
  }),
});

const securityConfigSchema = Type.Object({
  RATE_LIMIT_MAX: Type.Number({ default: 100 }),
});

const prismaConfigSchema = Type.Object({
  DATABASE_URL: Type.String({
    default: 'postgresql://admin:test@localhost:5432/budget_db',
  }),
});

const redisConfigSchema = Type.Object({
  REDIS_HOST: Type.String({
    default: 'localhost',
  }),
  REDIS_PORT: Type.Number({
    default: 6379,
  }),
  REDIS_PASSWORD: Type.String({
    default: 'redis',
  }),
});

export const applicationEnvironmentConfigSchema = Type.Composite(
  [
    nodeConfigSchema,
    databaseConfigSchema,
    securityConfigSchema,
    jwtConfigSchema,
    cookieConfigSchema,
    prismaConfigSchema,
    redisConfigSchema,
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
