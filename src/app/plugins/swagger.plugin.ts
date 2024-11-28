import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import fp from 'fastify-plugin';
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

export default fp(swagger);

const swaggerConfig: Partial<OpenAPIV3.Document | OpenAPIV3_1.Document> = {
  openapi: '3.0.0',
  info: {
    title: 'Budget Duck API',
    description: 'Documentation of the budget duck API',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local development Server',
    },
  ],
  externalDocs: {
    url: 'https://github.com/moon-penguin/budget-duck',
    description: 'Github Repository of Budget Duck 🦆',
  },
};

// TODO: add ducky favicon and logo to config
const swaggerUIConfig: FastifySwaggerUiOptions = {
  routePrefix: '/api/documentation',
  uiConfig: {
    docExpansion: 'list',
  },
  theme: {
    title: 'Budget Duck Documentation',
  },
};

async function swagger(fastify: FastifyInstance) {
  fastify.register(fastifySwagger, {
    openapi: swaggerConfig,
  });
  fastify.register(fastifySwaggerUi, swaggerUIConfig);
}
