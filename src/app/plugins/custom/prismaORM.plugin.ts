import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { PrismaService } from '../../shared/database/prisma';

export default fp(prismaORM);

async function prismaORM(fastify: FastifyInstance) {
  const databaseUrl = fastify['config'].DATABASE_URL;
  const prisma = PrismaService.prismaClient(databaseUrl);

  fastify.addHook('onReady', async function connect() {
    await prisma.$connect();
    fastify.log.info('[ PRISMA ORM ] connection successful');
  });

  fastify.addHook('onClose', async function disconnect() {
    await prisma.$disconnect();
    fastify.log.info('[ PRISMA ORM ] connection closed');
  });
}
