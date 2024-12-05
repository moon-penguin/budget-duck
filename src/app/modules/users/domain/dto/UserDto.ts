import { Static } from '@sinclair/typebox';
import { UserSchema } from '../schemas/UserSchema';

export type UserDto = Static<typeof UserSchema>;
