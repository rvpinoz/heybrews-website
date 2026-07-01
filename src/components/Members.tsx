'use client';

import { useLang } from '@/context/LangContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Eyebrow } from '@/components/Eyebrow';
import MemberCard from '@/components/MemberCard';
import type { MemberRecord } from '@/types/member-record';

export default function Members({ members }: { members: MemberRecord[] }) {
  const { t } = useLang();

  if (members.length === 0) return null;

  return (
    <section id="members" className="py-[88px]">
      <div className="mx-auto max-w-5xl px-5">
        <ScrollReveal>
          {/* Section head */}
          <div className="mb-12 text-center">
            <Eyebrow>{t('mem_eyebrow')}</Eyebrow>
            <h2 className="heading-1 mt-4">{t('mem_title')}</h2>
            <p className="mx-auto mt-4 max-w-[540px] text-[18px] text-ink-muted">
              {t('mem_sub')}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
