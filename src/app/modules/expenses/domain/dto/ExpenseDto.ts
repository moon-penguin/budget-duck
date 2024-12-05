import { Static } from '@sinclair/typebox';
import { ExpenseSchema } from '../schemas/ExpenseSchema';

export type ExpenseDto = Static<typeof ExpenseSchema>;
