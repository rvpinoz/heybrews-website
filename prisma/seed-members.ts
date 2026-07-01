import { PrismaClient } from '../src/generated/prisma/client';
import { MEMBERS } from '../src/data/members';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.member.count();
  if (count > 0) {
    console.log(`Member table already has ${count} rows, skipping seed.`);
    return;
  }

  for (let i = 0; i < MEMBERS.length; i++) {
    const m = MEMBERS[i];
    await prisma.member.create({
      data: {
        handle: m.handle,
        name: m.name,
        img: m.img,
        fid: m.fid,
        fen: m.fen,
        bioId: m.bio_id,
        bioEn: m.bio_en,
        link: m.link,
        order: i,
      },
    });
  }
  console.log(`Seeded ${MEMBERS.length} members.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
