export interface Position {
  id: string;
  title: string;
  category: string[];
  value: number;
  cycle: Cycle;
  type: Type;
  date: Date;
}

type Cycle = 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';

type Type = 'income' | 'expense';
