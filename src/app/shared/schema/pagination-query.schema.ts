import { Static, Type } from '@sinclair/typebox';

export const PaginationQuerySchema = Type.Object(
  {
    limit: Type.Optional(
      Type.Number({
        minimum: 1,
      })
    ),
    offset: Type.Optional(
      Type.Number({
        minimum: 1,
      })
    ),
  },
  {
    $id: 'schema:pagination:query',
    title: 'PaginationQuery',
  }
);

export type PaginationQueryDto = Static<typeof PaginationQuerySchema>;
