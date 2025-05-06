import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';
import prismaClient from '../../shared/database/prisma';

declare module 'fastify' {
  export interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export default fp(prismaORM);

async function prismaORM(fastify: FastifyInstance) {
  const prisma = prismaClient;

  fastify.decorate('prisma', prisma);

  fastify.addHook('onReady', async function connect() {
    await prisma.$connect();
    fastify.log.info('[ PRISMA ORM ] connection successful');
  });

  fastify.addHook('onClose', async function disconnect() {
    await prisma.$disconnect();
    fastify.log.info('[ PRISMA ORM ] connection closed');
  });
}
