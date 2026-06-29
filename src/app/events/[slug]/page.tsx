import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import CtaStrip from '@/components/CtaStrip';
import Footer from '@/components/Footer';
import EventDetail from '@/components/EventDetail';
import { EVENTS } from '@/data/events';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.id === slug);
  if (!event) return {};

  return {
    title: `${event.title_id} — HeyBrews`,
    description: event.desc_id,
    openGraph: {
      title: event.title_id,
      description: event.desc_id,
      images: [event.img],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.id === slug);
  if (!event) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-8">
        <EventDetail event={event} />
      </main>
      <CtaStrip />
      <Footer />
    </>
  );
}
