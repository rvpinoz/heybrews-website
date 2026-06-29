import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import GallerySection from '@/components/GallerySection';
import CtaStrip from '@/components/CtaStrip';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Galeri — HeyBrews',
  description: 'Foto, video, dan momen di balik setiap seduhan dan kolaborasi HeyBrews.',
  openGraph: {
    title: 'Galeri — HeyBrews',
    description: 'Foto, video, dan momen di balik setiap seduhan dan kolaborasi HeyBrews.',
  },
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <GallerySection />
        <CtaStrip />
      </main>
      <Footer />
    </>
  );
}
