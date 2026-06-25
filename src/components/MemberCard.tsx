'use client';

import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import type { Member } from '@/types/member';

export default function MemberCard({ member }: { member: Member }) {
  const { lang } = useLang();

  return (
    <a
      href={member.link}
      target="_blank"
      rel="noopener"
      className="group block overflow-hidden rounded-xl border border-hairline bg-canvas no-underline transition-all hover:-translate-y-1 hover:border-[rgba(0,74,173,.15)] hover:shadow-[0_8px_30px_rgba(0,74,173,.08)]"
    >
      {/* Photo */}
      <div className="relative aspect-square overflow-hidden bg-canvas-soft">
        <Image
          src={member.img}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-400 group-hover:scale-105"
          loading="lazy"
          sizes="(max-width:640px) 100vw, (max-width:900px) 50vw, 25vw"
        />
        {/* Handle badge */}
        <span className="absolute bottom-[10px] left-[10px] rounded-full bg-black/55 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur-lg">
          {member.handle}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 pb-[18px]">
        <p className="text-[15px] font-bold -tracking-wide text-ink">
          {member.name}
        </p>
        <p className="mt-1.5 text-[13px] leading-snug text-ink-muted">
          {lang === 'en' ? member.bio_en : member.bio_id}
        </p>
        <span className="mt-2.5 inline-block rounded-full bg-[rgba(0,74,173,.07)] px-2.5 py-0.5 text-[11px] font-semibold text-primary">
          {lang === 'en' ? member.fen : member.fid}
        </span>
      </div>
    </a>
  );
}
