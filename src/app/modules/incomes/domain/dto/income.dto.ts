import { Static } from '@sinclair/typebox';
import { IncomeSchema } from '../schemas/income.schema';

export type IncomeDto = Static<typeof IncomeSchema>;
