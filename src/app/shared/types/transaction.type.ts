import { TLiteral, Type } from '@sinclair/typebox';

const Cycles = ['ONCE', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'] as const;
const Types = ['INCOME', 'EXPENSE'] as const;

const CycleLiterals = buildTypeLiteralsOf(Cycles);
const TypeLiterals = buildTypeLiteralsOf(Types);

export const TransactionCycle = Type.Union(CycleLiterals);
export const TransactionType = Type.Union(TypeLiterals);

function buildTypeLiteralsOf<T extends ReadonlyArray<string>, K extends number>(
  list: T
) {
  return list.map((literal) => Type.Literal(literal)) as Array<TLiteral<T[K]>>;
}
