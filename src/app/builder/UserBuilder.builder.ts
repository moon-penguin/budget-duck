import { User } from '@prisma/client';

export class UserBuilder {
  private user: User = {
    id: '1',
    name: 'Mimi Soma',
    email: 'mimi@soma.de',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  build(metaUser?: Partial<User>): User {
    return {
      ...this.user,
      ...metaUser,
    };
  }
}
