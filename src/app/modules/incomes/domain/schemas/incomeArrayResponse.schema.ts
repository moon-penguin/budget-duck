import { Type } from '@sinclair/typebox';
import { IncomeSchema } from './income.schema';

export const IncomeArrayResponseSchema = Type.Array(IncomeSchema, {
  $id: 'schema:income:array:response',
  title: 'IncomeArrayResponse',
});
