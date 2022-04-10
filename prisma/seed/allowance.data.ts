import { Allowance } from '.prisma/client';

export const allowances: Omit<Allowance, 'createdAt' | 'updatedAt'>[] = [
  {
    id: '43252c8e-09c4-4036-a495-0978cb22e4e7',
    awardCode: 'MA000002',
    name: 'meal',
    amount: 250,
    publishedYear: 2021,
  },
  {
    id: '80e8066f-011e-4af5-bfb2-6d1e5839ee23',
    awardCode: 'MA000104',
    name: 'meal',
    amount: 250,
    publishedYear: 2021,
  },
];
