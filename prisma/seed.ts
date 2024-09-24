import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const client = new PrismaClient();

const createSeed = async () => {
  await client.user.upsert({
    where: { email: "x3mnaufalnabilramadhan@gmail.com" },
    update: {},
    create: {
      name: "Naufal Nabil Ramadhan | ADMIN",
      email: "x3mnaufalnabilramadhan@gmail.com",
      User_Auth: {
        create: {
          password: await hash(process.env.SEED_PASSWORD as string, 10),
        },
      },
      role: "ADMIN",
      kelas: "XI RPL 6",
    },
  });
};
createSeed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
