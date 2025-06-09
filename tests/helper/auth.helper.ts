import { FastifyInstance } from 'fastify';
import { RegisterUserDto } from '../../src/app/modules/authentication/domain/dtos/register-user.dto';

export async function authAndGetToken(
  server: FastifyInstance,
  user: RegisterUserDto
) {
  // register user
  await server.inject({
    method: 'POST',
    url: '/api/auth/register',
    body: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });

  // login user to get bearer token
  const loginResponse = await server.inject({
    method: 'POST',
    url: '/api/auth/login',
    body: {
      email: user.email,
      password: user.password,
    },
  });

  return loginResponse.json().refreshToken as string;
}
