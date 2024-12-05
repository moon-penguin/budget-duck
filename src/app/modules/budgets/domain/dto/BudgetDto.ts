import { Static } from '@sinclair/typebox';
import { BudgetSchema } from '../schemas/budget.schema';

export type BudgetDto = Static<typeof BudgetSchema>;
