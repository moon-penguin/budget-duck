import { Type } from '@sinclair/typebox';
import { ExpenseSchema } from './expense.schema';

export const ExpensesResponseSchema = Type.Array(ExpenseSchema, {
  $id: 'schema:expense:array:response',
  title: 'Expenses',
});
