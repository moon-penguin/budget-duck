import { Type } from '@sinclair/typebox';
import {
  TRANSACTION_TYPE,
  TransactionCycles,
} from '../../../../shared/types/transaction.type';

export const CreateIncomeSchema = Type.Object(
  {
    title: Type.String(),
    category: Type.Array(Type.String()),
    value: Type.Number(),
    cycle: TransactionCycles,
    type: Type.Literal(TRANSACTION_TYPE.INCOME),
    date: Type.String({
      format: 'date-time',
    }),
  },
  {
    $id: 'schema:income:create',
    additionalProperties: false,
    title: 'Create Income',
  }
);
