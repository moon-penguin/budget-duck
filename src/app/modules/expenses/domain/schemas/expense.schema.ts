import { Type } from '@sinclair/typebox';
import {
  TRANSACTION_TYPE,
  TransactionCycles,
} from '../../../../shared/types/transaction.type';

// Todo: restrict expense number range, minimum to 0 and max should be an open interval
export const ExpenseSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    category: Type.Array(Type.String()),
    value: Type.Number({
      minimum: 0,
    }),
    cycle: TransactionCycles,
    type: Type.Literal(TRANSACTION_TYPE.EXPENSE),
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
