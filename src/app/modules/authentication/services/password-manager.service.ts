import { compare, genSalt, hash } from 'bcrypt';

export class PasswordManagerService {
  private saltRounds = 10;

  async generateHashedPassword(password: string) {
    const salt = await genSalt(this.saltRounds);
    const hashedPassword = await hash(password, salt);

    return hashedPassword;
  }

  async comparePasswords(password: string, hashedPassword: string) {
    const result = await compare(password, hashedPassword);

    return result;
  }
}
