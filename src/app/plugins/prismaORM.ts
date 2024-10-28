import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import fp from 'fastify-plugin';

export default fp(prismaORM);

async function prismaORM(fastify: FastifyInstance) {
  const prisma = new PrismaClient();

  fastify.addHook('onReady', async function connect() {
    await prisma.$connect();
    fastify.log.info('[ PRISMA ORM ] database connection successful');
  });

  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async function disconnect() {
    await prisma.$disconnect();
    fastify.log.info('[ PRISMA ORM ] database connection closed');
  });
}
