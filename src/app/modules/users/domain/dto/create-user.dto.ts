import { Static } from '@sinclair/typebox';
import { CreateUserSchema } from '../schemas/createUser.schema';

export type CreateUserDto = Static<typeof CreateUserSchema>;
