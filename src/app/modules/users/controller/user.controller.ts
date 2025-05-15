import { FastifyReply, FastifyRequest } from 'fastify';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { LoginUserDto } from '../domain/dto/login-user.dto';
import { UserService } from '../services/user.service';

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

  async login(request: FastifyRequest, reply: FastifyReply) {
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
    return this.refresh(request, reply);
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    await request.revokeToken();
    reply.code(204);
  }

  async refresh(request: FastifyRequest, reply: FastifyReply) {
    return this.refreshHandler(request, reply);
  }

  private async refreshHandler(request: FastifyRequest, reply: FastifyReply) {
    const { accessToken } = await request.generateToken();
    reply.code(200);
    return { token: accessToken };
  }
}
