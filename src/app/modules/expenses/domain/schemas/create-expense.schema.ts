import { Type } from '@sinclair/typebox';
import {
  TransactionCycle,
  TransactionType,
} from '../../../../shared/types/transaction.type';

export const CreateExpenseSchema = Type.Object(
  {
    title: Type.String(),
    category: Type.Array(Type.String()),
    value: Type.Number(),
    cycle: TransactionCycle,
    type: TransactionType,
    date: Type.String({
      format: 'date-time',
    }),
  },
  {
    $id: 'schema:expense:create',
    additionalProperties: false,
    title: 'Create Expense',
  }
);
