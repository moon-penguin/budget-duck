import { UserRepository } from '../repository/user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async userExists(userId: string) {
    const user = await this.userRepository.findUserById(userId);

    return !!user;
  }
}
