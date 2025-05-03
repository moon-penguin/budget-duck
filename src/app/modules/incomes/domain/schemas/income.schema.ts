import { Type } from '@sinclair/typebox';
import {
  TRANSACTION_TYPE,
  TransactionCycles,
} from '../../../../shared/types/transaction.type';

export const IncomeSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    category: Type.Array(Type.String()),
    value: Type.Number({
      minimum: 0,
    }),
    cycle: TransactionCycles,
    type: Type.Literal(TRANSACTION_TYPE.INCOME),
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
    $id: 'schema:income',
    additionalProperties: false,
    title: 'Income',
  }
);
