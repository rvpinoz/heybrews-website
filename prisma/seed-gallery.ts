import { PrismaClient } from '../src/generated/prisma/client';
import { GALLERY } from '../src/data/gallery';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.galleryItem.count();
  if (count > 0) {
    console.log(`GalleryItem table already has ${count} rows, skipping seed.`);
    return;
  }

  for (const g of GALLERY) {
    await prisma.galleryItem.create({
      data: {
        src: g.src,
        width: g.width,
        height: g.height,
        altId: g.alt_id,
        altEn: g.alt_en,
        categoryId: g.category_id,
        categoryEn: g.category_en,
        span: g.span ?? 'sm',
      },
    });
  }
  console.log(`Seeded ${GALLERY.length} gallery items.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
