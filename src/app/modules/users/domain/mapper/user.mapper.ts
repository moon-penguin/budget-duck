import { User } from '@prisma/client';
import { UserDto } from '../dto/user.dto';

export class UserMapper {
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toString(),
      updatedAt: user.updatedAt.toString(),
      password: user.password,
    };
  }

  static toEntity(userDto: UserDto): User {
    return {
      id: userDto.id,
      email: userDto.email,
      name: userDto.name,
      createdAt: new Date(userDto.createdAt),
      updatedAt: new Date(userDto.updatedAt),
      password: userDto.password,
    };
  }
}
