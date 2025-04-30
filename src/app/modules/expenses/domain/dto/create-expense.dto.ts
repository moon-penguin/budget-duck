import { Static } from '@sinclair/typebox';
import { CreateExpenseSchema } from '../schemas/create-expense.schema';

export type CreateExpenseDto = Static<typeof CreateExpenseSchema>;
