import { Type } from '@sinclair/typebox';

enum CycleEnum {
  ONCE = 'ONCE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

enum TransactionTypeEnum {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export const TransactionCycle = Type.Enum(CycleEnum);
export const TransactionType = Type.Enum(TransactionTypeEnum);
