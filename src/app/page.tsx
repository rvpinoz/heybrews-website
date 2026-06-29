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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <VideoIntro />
        <Collab />
        <Events />
        <Partners />
        <MarqueeStrip />
        <CtaStrip />
      </main>
      <Footer />
    </>
  );
}
