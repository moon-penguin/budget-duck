import { Type } from '@sinclair/typebox';

export const RegisterUserSchema = Type.Object(
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
    $id: 'schema:user:register',
    additionalProperties: false,
    title: 'Register User',
  }
);
