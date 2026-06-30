import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import GallerySection from '@/components/GallerySection';
import CtaStrip from '@/components/CtaStrip';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Galeri — HeyBrews',
  description: 'Foto, video, dan momen di balik setiap seduhan dan kolaborasi HeyBrews.',
  openGraph: {
    title: 'Galeri — HeyBrews',
    description: 'Foto, video, dan momen di balik setiap seduhan dan kolaborasi HeyBrews.',
  },
};

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <GallerySection
          items={items.map((i) => ({
            id: i.id,
            src: i.src,
            width: i.width,
            height: i.height,
            altId: i.altId,
            altEn: i.altEn,
            categoryId: i.categoryId,
            categoryEn: i.categoryEn,
            span: i.span,
          }))}
        />
        <CtaStrip />
      </main>
      <Footer />
    </>
  );
}
