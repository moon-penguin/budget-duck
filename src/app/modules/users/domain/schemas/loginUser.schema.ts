import { Type } from '@sinclair/typebox';

export const LoginUserSchema = Type.Object(
  {
    email: Type.String({
      format: 'email',
    }),
    password: Type.String({
      minLength: 6,
      maxLength: 60,
    }),
  },
  {
    $id: 'schema:user:login',
    additionalProperties: false,
    title: 'Login User',
  }
);
