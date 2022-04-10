import { PrismaClient } from '.prisma/client';
import { allowances } from './seed/allowance.data';
import { awards } from './seed/award.data';
import { classifications } from './seed/classification.data';
import { penalties } from './seed/penalty.data';
const prisma = new PrismaClient();

async function main() {
  console.log('Deleting existing data...');
  await prisma.allowance.deleteMany();
  await prisma.penalty.deleteMany();
  await prisma.classification.deleteMany();
  await prisma.award.deleteMany();

  console.log('Seeding awards...');
  const createdAwards = await prisma.award.createMany({
    data: awards,
    skipDuplicates: true,
  });
  console.log(`Seeded ${createdAwards.count} awards`);

  console.log('Seeding classifications...');
  const createdClassifications = await prisma.classification.createMany({
    data: classifications,
    skipDuplicates: true,
  });
  console.log(`Seeded ${createdClassifications.count} classifications`);

  console.log('Seeding penalties...');
  const createdPenalties = await prisma.penalty.createMany({
    data: penalties,
    skipDuplicates: true,
  });
  console.log(`Seeded ${createdPenalties.count} penalties`);

  console.log('Seeding allowances...');
  const createdAllowances = await prisma.allowance.createMany({
    data: allowances,
    skipDuplicates: true,
  });
  console.log(`Seeded ${createdAllowances.count} allowances`);

  console.log('Seeding Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
