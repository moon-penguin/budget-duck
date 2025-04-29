import { Static } from '@sinclair/typebox';
import { LoginUserSchema } from '../schemas/loginUser.schema';

export type LoginUserDto = Static<typeof LoginUserSchema>;
