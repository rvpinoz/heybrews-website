import { Navbar } from "@/components/Navbar";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Collab from "@/components/Collab";
import About from "@/components/About";
import Members from "@/components/Members";
import CtaStrip from "@/components/CtaStrip";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Collab />
        <About />
        <Members />
        <CtaStrip />
      </main>
      <Footer />
    </>
  );
}
