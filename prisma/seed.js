import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pkg from '@prisma/client';

dotenv.config();

const { PrismaClient } = pkg;
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  const email = 'admin@serfix.sa';
  const plainPassword = 'Admin123!';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('Admin user already exists:', email);
    return;
  }

  const hashed = await bcrypt.hash(plainPassword, 10);

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email,
      password: hashed,
      role: 'ADMIN',
    },
  });

  // eslint-disable-next-line no-console
  console.log('Admin user created:', {
    username: admin.username,
    email: admin.email,
    password: plainPassword,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

