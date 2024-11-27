import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import prismaClient from '../shared/database/prisma';

export default fp(prismaORM);

async function prismaORM(fastify: FastifyInstance) {
  const prisma = prismaClient;

  fastify.addHook('onReady', async function connect() {
    await prisma.$connect();
    fastify.log.info('[ PRISMA ORM ] database connection successful');
  });

  fastify.addHook('onClose', async function disconnect() {
    await prisma.$disconnect();
    fastify.log.info('[ PRISMA ORM ] database connection closed');
  });
}
