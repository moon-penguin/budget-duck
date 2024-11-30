import { FastifyInstance, RouteOptions } from 'fastify';
import fp from 'fastify-plugin';

export default fp(addTagsToSchema);

async function addTagsToSchema(fastify: FastifyInstance) {
  fastify.addHook('onRoute', async (routeOptions) => {
    if (!isSwaggerDocumentationRoute(routeOptions.prefix)) {
      if (hasSchemaProp(routeOptions)) {
        routeOptions.schema.tags = [buildTagNameFrom(routeOptions.prefix)];
      } else {
        routeOptions.schema = {};
        routeOptions.schema.tags = [buildTagNameFrom(routeOptions.prefix)];
      }
    }
  });
}

function hasSchemaProp(routeOption: RouteOptions) {
  const props = Object.getOwnPropertyNames(routeOption);
  return props.includes('schema');
}

function buildTagNameFrom(routePrefix: string) {
  const routePrefixes = routePrefix.split('/');
  return routePrefixes.at(-1);
}

function isSwaggerDocumentationRoute(routePrefix: string) {
  return routePrefix.includes('documentation');
}
