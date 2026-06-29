export interface CollabItem {
  id: string;
  kind: 'service' | 'product';
  img?: string;
  title_id: string;
  title_en: string;
  desc_id: string;
  desc_en: string;
  tag_id: string;
  tag_en: string;
  body_id?: string;
  body_en?: string;
  featured?: boolean;
}

export const COLLABS: CollabItem[] = [
  {
    id: 'content-campaign',
    kind: 'service',
    featured: true,
    title_id: 'Konten & campaign',
    title_en: 'Content & campaigns',
    desc_id: 'Bikin video, review, dan campaign bareng creator yang ngerti audiensnya. Cocok buat brand kopi & lifestyle.',
    desc_en: 'Videos, reviews, and campaigns with creators who know their audience. Great for coffee & lifestyle brands.',
    tag_id: 'Layanan',
    tag_en: 'Service',
    body_id: 'HeyBrews punya jaringan creator kopi yang aktif dan engaged. Kami bisa bantu brand kamu bikin konten autentik — dari video review produk, Instagram Reels, sampai campaign multi-platform. Semua dikerjakan sama creator yang paham audiens kopi dan lifestyle.',
    body_en: 'HeyBrews has a network of active and engaged coffee creators. We can help your brand create authentic content — from product review videos, Instagram Reels, to multi-platform campaigns. All done by creators who understand the coffee and lifestyle audience.',
  },
  {
    id: 'product-collab',
    kind: 'service',
    title_id: 'Produk collab',
    title_en: 'Collab products',
    desc_id: 'Roastery blend, merch, sampai alat seduh edisi terbatas — dikembangkan bareng komunitas heybrews.',
    desc_en: 'Roastery blends, merch, and limited-edition brewing gear — developed with the heybrews community.',
    tag_id: 'Layanan',
    tag_en: 'Service',
    body_id: 'Punya ide produk kopi? Kami bisa bantu develop bareng komunitas — dari blend eksklusif, merch, sampai alat seduh edisi terbatas. Produk dikembangkan dengan input langsung dari member HeyBrews yang paham apa yang dibutuhkan penikmat kopi.',
    body_en: 'Got a coffee product idea? We can help develop it with the community — from exclusive blends, merch, to limited-edition brewing gear. Products are developed with direct input from HeyBrews members who know what coffee lovers need.',
  },
  {
    id: 'event-workshop',
    kind: 'service',
    title_id: 'Event & workshop',
    title_en: 'Events & workshops',
    desc_id: 'Cupping session, kelas latte art, sampai meet-up. Offline maupun online, kecil maupun besar.',
    desc_en: 'Cupping sessions, latte art classes, and meet-ups. Online or offline, big or small.',
    tag_id: 'Layanan',
    tag_en: 'Service',
    body_id: 'HeyBrews bisa bantu bikin event kopi yang berkesan — dari cupping session intim untuk 10 orang sampai meet-up besar lintas kota. Kami handle konsep, speaker dari komunitas, dan eksekusi. Bisa offline maupun online.',
    body_en: 'HeyBrews can help create memorable coffee events — from intimate cupping sessions for 10 people to large cross-city meet-ups. We handle the concept, community speakers, and execution. Offline or online.',
  },
  {
    id: 'pagi-blend',
    kind: 'product',
    img: '/events/collab-local-roastery.svg',
    title_id: 'heybrews × Local Roastery — "Pagi" Blend',
    title_en: 'heybrews × Local Roastery — "Pagi" Blend',
    desc_id: 'House blend ringan-manis, hasil racikan komunitas. Edisi pertama.',
    desc_en: 'A light, sweet house blend crafted by the community. First edition.',
    tag_id: 'Produk collab terbaru',
    tag_en: 'Latest collab product',
    body_id: 'Blend pertama dari kolaborasi HeyBrews × Local Roastery. "Pagi" adalah house blend ringan-manis yang di-develop bareng komunitas lewat serangkaian cupping session. Notes: cokelat susu, karamel, sedikit buah. Edisi terbatas 200 pack.',
    body_en: 'The first blend from the HeyBrews × Local Roastery collaboration. "Pagi" is a light, sweet house blend developed with the community through a series of cupping sessions. Notes: milk chocolate, caramel, hint of fruit. Limited to 200 packs.',
  },
  {
    id: 'brewers-daily-kit',
    kind: 'product',
    title_id: "Brewer's Daily Kit",
    title_en: "Brewer's Daily Kit",
    desc_id: 'Tote, tumbler, dan zine resep dari member heybrews.',
    desc_en: 'Tote, tumbler, and a recipe zine from heybrews members.',
    tag_id: 'Merch',
    tag_en: 'Merch',
    body_id: "Brewer's Daily Kit adalah paket merch pertama HeyBrews. Isinya tote bag kanvas, tumbler stainless 350ml, dan zine resep kopi dari para member. Cocok buat daily brewing companion atau hadiah buat teman yang suka ngopi.",
    body_en: "Brewer's Daily Kit is HeyBrews' first merch bundle. Includes a canvas tote bag, 350ml stainless tumbler, and a coffee recipe zine from our members. Perfect as a daily brewing companion or a gift for coffee-loving friends.",
  },
];
