export interface EventItem {
  id: string;
  img: string;
  date: string;
  title_id: string;
  title_en: string;
  desc_id: string;
  desc_en: string;
  tag_id: string;
  tag_en: string;
}

export const EVENTS: EventItem[] = [
  {
    id: 'cupping-vol1',
    img: '/events/cupping-vol1.svg',
    date: '2026-05-18',
    title_id: 'Cupping Session Vol. 1',
    title_en: 'Cupping Session Vol. 1',
    desc_id: 'Sesi cupping pertama bareng 12 member HeyBrews. Cobain 5 single origin dari roastery lokal dan diskusi soal tasting notes.',
    desc_en: 'Our first cupping session with 12 HeyBrews members. Tasted 5 single origins from local roasteries and discussed tasting notes.',
    tag_id: 'Event',
    tag_en: 'Event',
  },
  {
    id: 'collab-local-roastery',
    img: '/events/collab-local-roastery.svg',
    date: '2026-04-10',
    title_id: 'HeyBrews × Local Roastery — "Pagi" Blend',
    title_en: 'HeyBrews × Local Roastery — "Pagi" Blend',
    desc_id: 'Kolaborasi pertama! Bareng Local Roastery bikin house blend eksklusif yang di-develop sama komunitas. Edisi terbatas 200 pack.',
    desc_en: 'Our first collab! Partnered with Local Roastery to create an exclusive community-developed house blend. Limited to 200 packs.',
    tag_id: 'Kolaborasi',
    tag_en: 'Collaboration',
  },
  {
    id: 'latte-art-workshop',
    img: '/events/latte-art-workshop.svg',
    date: '2026-03-22',
    title_id: 'Latte Art Workshop bareng Adhitya',
    title_en: 'Latte Art Workshop with Adhitya',
    desc_id: 'Workshop latte art untuk pemula dibimbing langsung sama Adhitya Irama. Peserta belajar dari basic heart sampai tulip.',
    desc_en: 'Beginner latte art workshop guided by Adhitya Irama. Participants learned from basic hearts to tulips.',
    tag_id: 'Workshop',
    tag_en: 'Workshop',
  },
  {
    id: 'meetup-jakarta',
    img: '/events/meetup-jakarta.svg',
    date: '2026-02-15',
    title_id: 'HeyBrews Meet-up Jakarta',
    title_en: 'HeyBrews Meet-up Jakarta',
    desc_id: 'Meet-up pertama di Jakarta! Ngopi bareng, sharing session, dan kenalan antar member dari berbagai kota.',
    desc_en: 'Our first Jakarta meet-up! Coffee together, sharing sessions, and connecting members from different cities.',
    tag_id: 'Meet-up',
    tag_en: 'Meet-up',
  },
];
