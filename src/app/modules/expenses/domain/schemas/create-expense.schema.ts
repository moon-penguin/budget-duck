import { Type } from '@sinclair/typebox';
import {
  TRANSACTION_TYPE,
  TransactionCycles,
} from '../../../../shared/types/transaction.type';

export const CreateExpenseSchema = Type.Object(
  {
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
  },
  {
    $id: 'schema:expense:create',
    additionalProperties: false,
    title: 'Create Expense',
  }
);
