import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const EMAIL    = "admin@christian.dev";
const PASSWORD = "Admin@1234";

async function main() {
  const hash = await bcrypt.hash(PASSWORD, 10);

  const user = await prisma.user.upsert({
    where:  { email: EMAIL },
    update: { password: hash, role: "ADMIN" },
    create: { email: EMAIL, name: "Christian", password: hash, role: "ADMIN" },
  });

  console.log("✓ Admin user ready:");
  console.log("  Email   :", EMAIL);
  console.log("  Password:", PASSWORD);
  console.log("  ID      :", user.id);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
