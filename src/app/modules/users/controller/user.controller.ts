import { User } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserRepository } from '../repository/user.repository';

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const reqUser = request.body as User;
      const existingUser = await this.userRepository.findUser(reqUser);

      if (existingUser) {
        reply.conflict();
      } else {
        await this.userRepository.create(reqUser);
        reply.statusCode = 201;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }
}
