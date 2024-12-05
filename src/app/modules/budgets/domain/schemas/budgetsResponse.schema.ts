import { Type } from '@sinclair/typebox';
import { BudgetSchema } from './budget.schema';

export const BudgetsResponseSchema = Type.Array(BudgetSchema, {
  $id: 'schema:budget:array:response',
  additionalProperties: false,
  title: 'Budgets',
});
