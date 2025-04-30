import { Static } from '@sinclair/typebox';
import { ExpenseSchema } from '../schemas/expense.schema';

export type ExpenseDto = Static<typeof ExpenseSchema>;
