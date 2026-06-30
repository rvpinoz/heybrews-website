import { PrismaClient } from '../src/generated/prisma/client';
import { EVENTS } from '../src/data/events';

const prisma = new PrismaClient();

async function main() {
  for (const e of EVENTS) {
    await prisma.event.upsert({
      where: { slug: e.id },
      update: {},
      create: {
        slug: e.id,
        img: e.img,
        date: new Date(e.date),
        titleId: e.title_id,
        titleEn: e.title_en,
        descId: e.desc_id,
        descEn: e.desc_en,
        tagId: e.tag_id,
        tagEn: e.tag_en,
      },
    });
  }
  console.log(`Seeded ${EVENTS.length} events.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
