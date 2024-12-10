import { Type } from '@sinclair/typebox';
import {
  TransactionCycle,
  TransactionType,
} from '../../../../shared/types/transaction.type';

export const ExpenseSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    category: Type.Array(Type.String()),
    value: Type.Number(),
    cycle: TransactionCycle,
    type: TransactionType,
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
    title: 'Expense',
  }
);
