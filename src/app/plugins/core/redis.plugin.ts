import { FastifyInstance } from 'fastify';
import fastifyRedis, { FastifyRedis } from '@fastify/redis';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    redis: FastifyRedis;
    redis_insert: typeof insert;
    redis_validate: typeof validate;
    redis_invalidate: typeof invalidate;
  }
}

export default fp(redis, { name: 'redis' });

async function redis(fastify: FastifyInstance) {
  await fastify.register(fastifyRedis, {
    host: fastify.config.REDIS_HOST,
    port: fastify.config.REDIS_PORT,
  });

  fastify.addHook('onReady', async function () {
    fastify.log.info('[ REDIS ] connection successful');
  });

  fastify.addHook('onClose', async function () {
    await fastify.redis.quit();
    fastify.log.info('[ REDIS ] closed successful');
  });

  fastify.decorate('redis_insert', insert);
  fastify.decorate('redis_validate', validate);
  fastify.decorate('redis_invalidate', invalidate);
}

async function insert(this: FastifyInstance, userId: number, tokenId: string) {
  await this.redis.set(getKey(userId), tokenId);
}

async function validate(
  this: FastifyInstance,
  userId: number,
  tokenId: string
) {
  const storedTokenId = await this.redis.get(getKey(userId));

  return storedTokenId === tokenId;
}

async function invalidate(this: FastifyInstance, userId: number) {
  await this.redis.del(getKey(userId));
}

function getKey(userId: number) {
  return `user-${userId}`;
}
