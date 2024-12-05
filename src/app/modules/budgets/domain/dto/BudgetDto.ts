import { Static } from '@sinclair/typebox';
import { BudgetSchema } from '../schemas/BudgetSchema';

export type BudgetDto = Static<typeof BudgetSchema>;
