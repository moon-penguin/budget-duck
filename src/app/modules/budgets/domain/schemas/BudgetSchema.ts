import { Type } from '@sinclair/typebox';

enum CycleEnum {
  ONCE = 'ONCE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

enum TransactionTypeEnum {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export const TransactionCycle = Type.Enum(CycleEnum);
export const TransactionType = Type.Enum(TransactionTypeEnum);

export const BudgetSchema = Type.Object(
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
  { $id: 'schema:budget', additionalProperties: false }
);
