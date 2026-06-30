import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import CtaStrip from '@/components/CtaStrip';
import Footer from '@/components/Footer';
import EventDetail from '@/components/EventDetail';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const events = await prisma.event.findMany({ select: { slug: true } });
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });
  if (!event) return {};

  return {
    title: `${event.titleId} — HeyBrews`,
    description: event.descId,
    openGraph: {
      title: event.titleId,
      description: event.descId,
      images: [event.img],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });
  if (!event) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-8">
        <EventDetail
          event={{
            id: event.id,
            slug: event.slug,
            img: event.img,
            date: event.date.toISOString(),
            titleId: event.titleId,
            titleEn: event.titleEn,
            descId: event.descId,
            descEn: event.descEn,
            tagId: event.tagId,
            tagEn: event.tagEn,
          }}
        />
      </main>
      <CtaStrip />
      <Footer />
    </>
  );
}
