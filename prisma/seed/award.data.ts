import { Award } from '.prisma/client';
export const awards: Omit<Award, 'id' | 'updatedAt' | 'createdAt'>[] = [
  {
    code: 'MA000002',
    name: 'Clerks—Private Sector Award 2020',
    publishedYear: 2021,
  },
  {
    code: 'MA000065',
    name: 'Professional Employees Award 2020',
    publishedYear: 2021,
  },
  {
    code: 'MA000104',
    name: 'Miscellaneous Award 2020',
    publishedYear: 2021,
  },
];
