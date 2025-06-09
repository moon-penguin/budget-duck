import { Static } from '@sinclair/typebox';
import { RegisterUserSchema } from '../schemas/registerUser.schema';

export type RegisterUserDto = Static<typeof RegisterUserSchema>;
