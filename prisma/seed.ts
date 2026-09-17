import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main(){
  const ownerEmail = process.env.OWNER_EMAIL?.trim().toLowerCase();
  if (!ownerEmail) {
    console.log("OWNER_EMAIL not set; skipping owner bootstrap.");
    return;
  }
  await prisma.user.upsert({
    where: { email: ownerEmail },
    update: { role: "OWNER_SUPER_ADMIN", planCode: "OWNER" },
    create: { email: ownerEmail, name: "Platform Owner", role: "OWNER_SUPER_ADMIN", planCode: "OWNER" },
  });
  console.log(`Owner/Super Admin bootstrapped: ${ownerEmail}`);
}

main().finally(async()=>prisma.$disconnect());
