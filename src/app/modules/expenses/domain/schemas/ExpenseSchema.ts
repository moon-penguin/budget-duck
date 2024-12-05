import { Type } from '@sinclair/typebox';
import {
  TransactionCycle,
  TransactionType,
} from '../../../budgets/domain/schemas/BudgetSchema';

export const ExpenseSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    category: Type.Array(Type.String()),
    value: Type.Number(),
    cycle: Type.Enum(TransactionCycle),
    type: Type.Enum(TransactionType),
    date: Type.String({
      format: 'date-time',
    }),
    createdAt: Type.String({
      format: 'date-time',
    }),
    updatedAt: Type.String({
      format: 'date-time',
    }),
  },
  {
    $id: 'schema:expense',
    additionalProperties: false,
  }
);
