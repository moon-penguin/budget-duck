import { Type } from '@sinclair/typebox';

export const UserSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String(),
    password: Type.String(),
    email: Type.String({
      format: 'email',
    }),
    createdAt: Type.String({
      format: 'date-time',
    }),
    updatedAt: Type.String({
      format: 'date-time',
    }),
  },
  {
    $id: 'schema:user',
    additionalProperties: false,
  }
);
