import { afterEach, beforeEach, test } from 'vitest';
import { buildServer } from '../../../helper/buildServer';
import { FastifyInstance } from 'fastify';

let server: FastifyInstance;

beforeEach(async () => {
  server = await buildServer();
});

afterEach(async () => {
  await server.close();
});

test('should get all budgets', async () => {
  const response = await server.inject({
    method: 'GET',
    url: '/budgets',
  });

  console.log(response.json());
});
