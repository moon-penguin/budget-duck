import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  test: {
    deps: {
      inline: ['@fastify/autoload'],
    },
  },
});
