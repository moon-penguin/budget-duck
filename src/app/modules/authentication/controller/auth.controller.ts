import { AuthenticationService } from '../services/auth.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterUserDto } from '../domain/dtos/register-user.dto';
import { LoginUserDto } from '../domain/dtos/login-user.dto';
import {
  LoginResponseDto,
  RefreshResponseDto,
} from '../domain/schemas/loginResponse.schema';

export class AuthenticationController {
  private readonly authenticationService: AuthenticationService;

  constructor() {
    this.authenticationService = new AuthenticationService();
  }

  async register(request: FastifyRequest, reply: FastifyReply) {
    const createUserDto = request.body as RegisterUserDto;

    const registerUser = await this.authenticationService.register(
      createUserDto
    );

    if (registerUser.status === 'failed') {
      reply.conflict(registerUser.message);
      return;
    }

    reply.code(201).send(registerUser.message);
  }

  async login(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<LoginResponseDto> {
    const loginUserDto = request.body as LoginUserDto;

    const {
      status,
      message,
      data: user,
    } = await this.authenticationService.login(loginUserDto);

    if (status === 'failed') {
      reply.conflict(message);
      return;
    }

    request.user = user;

    reply.code(200);
    const { accessToken, refreshToken } = await request.generateToken();

    return { token: accessToken, refreshToken };
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    await request.revokeToken();
    reply.code(200);
  }

  async refreshToken(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<RefreshResponseDto> {
    const { refreshToken } = await request.generateToken();
    reply.code(200);
    return { refreshToken };
  }

  async me(request: FastifyRequest, reply: FastifyReply) {
    if (request.user) {
      reply.code(200);
      return request.user;
    } else {
      reply.notFound();
      return;
    }
  }
}
