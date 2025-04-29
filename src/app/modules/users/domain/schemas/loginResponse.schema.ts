import { Type } from '@sinclair/typebox';

export const LoginResponseSchema = Type.Object(
  {
    token: Type.String({}),
  },
  {
    $id: 'schema:user:login:response',
    title: 'Login Response Schema',
    description: 'Sends a token if login was successful',
  }
);
