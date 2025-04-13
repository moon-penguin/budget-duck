import { FastifyInstance } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fp from 'fastify-plugin';
import applicationConfig from '../../configuration/application.config';

export default fp(jwtAuth);

// TODO: auth plugin with jwt token
async function jwtAuth(fastify: FastifyInstance) {
  await fastify.register(fastifyJwt, {
    secret: applicationConfig.JWT_SECRET,
  });
}
