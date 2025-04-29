import { Type } from '@sinclair/typebox';

export const CreateUserSchema = Type.Object(
  {
    name: Type.String({
      minLength: 3,
      maxLength: 50,
    }),
    email: Type.String({
      format: 'email',
    }),
    password: Type.String({
      minLength: 6,
      maxLength: 60,
    }),
  },
  {
    $id: 'schema:user:create',
    additionalProperties: false,
    title: 'Create User',
  }
);
