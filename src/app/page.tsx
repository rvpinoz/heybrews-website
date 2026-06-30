import { Navbar } from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VideoIntro from "@/components/VideoIntro";
import Collab from "@/components/Collab";
import Events from "@/components/Events";
import Partners from "@/components/Partners";
import MarqueeStrip from "@/components/MarqueeStrip";
import CtaStrip from "@/components/CtaStrip";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function Home() {
  const events = await prisma.event.findMany({ orderBy: { date: 'desc' } });

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <VideoIntro />
        <Collab />
        <Events
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
        <Partners />
        <MarqueeStrip />
        <CtaStrip />
      </main>
      <Footer />
    </>
  );
}
