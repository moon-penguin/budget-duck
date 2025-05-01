import { Static } from '@sinclair/typebox';
import { CreateIncomeSchema } from '../schemas/create-income.schema';

export type CreateIncomeDto = Static<typeof CreateIncomeSchema>;
