import { Static, Type } from '@sinclair/typebox';

export const LoginResponseSchema = Type.Object(
  {
    token: Type.String(),
    refreshToken: Type.String(),
  },
  {
    $id: 'schema:user:login:response',
    title: 'Login Response Schema',
    description: 'Sends a token if login was successful',
  }
);

export const RefreshResponseSchema = Type.Object(
  {
    refreshToken: Type.String(),
  },
  {
    $id: 'schema:user:refresh:response',
    title: 'Refresh Response Schema',
    description: 'Sends a token if refresh was successful',
  }
);

export type LoginResponseDto = Static<typeof LoginResponseSchema>;
export type RefreshResponseDto = Static<typeof RefreshResponseSchema>;
