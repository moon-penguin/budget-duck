import { Type } from '@sinclair/typebox';

export const UserSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String({
      minLength: 3,
      maxLength: 50,
    }),
    password: Type.String({
      minLength: 6,
      maxLength: 60,
    }),
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
    title: 'User',
  }
);
