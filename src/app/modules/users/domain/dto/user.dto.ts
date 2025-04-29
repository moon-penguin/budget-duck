import { UserSchema } from '../schemas/user.schema';
import { Static } from '@sinclair/typebox';

export type UserDto = Static<typeof UserSchema>;
