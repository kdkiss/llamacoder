import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed your database here if needed
  // Example:
  // await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'alice@example.com',
  //   },
  // });
  console.log('Database seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });