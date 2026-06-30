import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import EventsSection from '@/components/EventsSection';
import CtaStrip from '@/components/CtaStrip';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Kegiatan — HeyBrews',
  description: 'Semua event, workshop, dan kolaborasi yang sudah dijalankan HeyBrews.',
};

export default async function EventsPage() {
  const events = await prisma.event.findMany({ orderBy: { date: 'desc' } });

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <EventsSection
          events={events.map((e) => ({
            id: e.id,
            slug: e.slug,
            img: e.img,
            date: e.date.toISOString(),
            titleId: e.titleId,
            titleEn: e.titleEn,
            descId: e.descId,
            descEn: e.descEn,
            tagId: e.tagId,
            tagEn: e.tagEn,
          }))}
        />
        <CtaStrip />
      </main>
      <Footer />
    </>
  );
}
