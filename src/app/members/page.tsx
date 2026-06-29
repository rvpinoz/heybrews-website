import { Navbar } from "@/components/Navbar";
import Members from "@/components/Members";
import CtaStrip from "@/components/CtaStrip";
import Footer from "@/components/Footer";

export default function MembersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <Members />
        <CtaStrip />
      </main>
      <Footer />
    </>
  );
}
