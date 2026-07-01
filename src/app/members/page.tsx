import { Navbar } from "@/components/Navbar";
import Members from "@/components/Members";
import CtaStrip from "@/components/CtaStrip";
import Footer from "@/components/Footer";
import MemberSplashCursor from "@/components/MemberSplashCursor";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function MembersPage() {
  const members = await prisma.member.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      {/* Fluid cursor — desktop only, no reduced-motion. Disable: comment this line */}
      <MemberSplashCursor />

      {/* z-10 ensures content stays above the z-1 splash effect */}
      <div className="relative z-10">
        <Navbar />
        <main className="pt-24">
          <Members
            members={members.map((m) => ({
              id: m.id,
              handle: m.handle,
              name: m.name,
              img: m.img,
              fid: m.fid,
              fen: m.fen,
              bio_id: m.bioId,
              bio_en: m.bioEn,
              link: m.link,
            }))}
          />
          <CtaStrip />
        </main>
        <Footer />
      </div>
    </>
  );
}
