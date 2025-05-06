import { FastifyInstance } from 'fastify';
import { fastifyEnv } from '@fastify/env';
import {
  ApplicationEnvironmentConfig,
  applicationEnvironmentConfigSchema,
} from '../../configuration/types/configuration.types';
import fp from 'fastify-plugin';

declare module 'fastify' {
  export interface FastifyInstance {
    config: ApplicationEnvironmentConfig;
  }
}

export default fp(envConfig);

async function envConfig(fastify: FastifyInstance) {
  await fastify.register(fastifyEnv, {
    confKey: 'config',
    schema: applicationEnvironmentConfigSchema,
    dotenv: true,
  });
}
