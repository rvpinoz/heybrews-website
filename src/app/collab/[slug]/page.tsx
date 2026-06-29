import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import CtaStrip from '@/components/CtaStrip';
import Footer from '@/components/Footer';
import CollabDetail from '@/components/CollabDetail';
import { COLLABS } from '@/data/collab';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return COLLABS.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = COLLABS.find((c) => c.id === slug);
  if (!item) return {};

  return {
    title: `${item.title_id} — HeyBrews`,
    description: item.desc_id,
    openGraph: {
      title: item.title_id,
      description: item.desc_id,
      ...(item.img && { images: [item.img] }),
    },
  };
}

export default async function CollabPage({ params }: Props) {
  const { slug } = await params;
  const item = COLLABS.find((c) => c.id === slug);
  if (!item) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-8">
        <CollabDetail item={item} />
      </main>
      <CtaStrip />
      <Footer />
    </>
  );
}
