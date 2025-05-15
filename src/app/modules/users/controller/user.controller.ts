import { FastifyReply, FastifyRequest } from 'fastify';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { LoginUserDto } from '../domain/dto/login-user.dto';
import { UserService } from '../services/user.service';
import {
  LoginResponseDto,
  RefreshResponseDto,
} from '../domain/schemas/loginResponse.schema';

export class UserController {
  private userRepository: UserRepository;
  private userService: UserService;

  constructor() {
    this.userRepository = new UserRepository();
    this.userService = new UserService();
  }

  async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const reqCreateUser = request.body as CreateUserDto;
    const userAlreadyExists = await this.userService.verfiyUserByEmail(
      reqCreateUser.email
    );

    if (userAlreadyExists) {
      reply.conflict('User already registered.');
    } else {
      await this.userRepository.create(reqCreateUser);
      reply.code(201);
    }
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

  async login(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<LoginResponseDto> {
    const userDto = request.body as LoginUserDto;
    const user = await this.userRepository.findByEmail(userDto.email);

    if (!user) {
      return reply.unauthorized('Wrong credentials');
    }

    const isPasswordValid = await this.userService.verifyPassword(
      userDto.password,
      user.password
    );

    if (!isPasswordValid) {
      return reply.unauthorized('Wrong credentials');
    }

    request.user = user;
    reply.code(200);

    return await this.tokenHandler(request);
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    await request.revokeToken();
    reply.code(204);
  }

  async refresh(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<RefreshResponseDto> {
    const { refreshToken } = await this.tokenHandler(request);
    reply.code(200);
    return { refreshToken: refreshToken };
  }

  private async tokenHandler(
    request: FastifyRequest
  ): Promise<LoginResponseDto> {
    const { accessToken, refreshToken } = await request.generateToken();
    return { token: accessToken, refreshToken };
  }
}
