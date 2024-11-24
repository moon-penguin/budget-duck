import { User } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserRepository } from '../repository/user.repository';

export class UsersController {
  private userRepository: UserRepository;

  constructor(repository: UserRepository) {
    this.userRepository = repository;
  }

  async registerUser(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const reqUser = request.body as User;
      const existingUser = await this.userRepository.findUser(reqUser);

      if (existingUser) {
        reply.statusCode = 409;
        throw new Error('User already exists');
      }

      await this.userRepository.create(reqUser);
      reply.statusCode = 201;
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }
}
