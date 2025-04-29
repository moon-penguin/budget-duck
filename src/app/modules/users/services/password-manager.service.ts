import { compare, hash } from 'bcrypt';

export class PasswordManagerService {
  private saltRounds = 10;

  async generateHashedPassword(password: string) {
    const hashedPassword = await hash(password, this.saltRounds);

    return hashedPassword;
  }

  async comparePasswords(password: string, hashedPassword: string) {
    const result = await compare(password, hashedPassword);

    return result;
  }
}
