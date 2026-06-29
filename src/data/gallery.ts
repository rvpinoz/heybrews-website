export interface GalleryItem {
  id: string;
  src: string;
  width: number;
  height: number;
  alt_id: string;
  alt_en: string;
  category_id: string;
  category_en: string;
  span?: 'lg' | 'md' | 'sm';
}

// Cara menambah foto:
// 1. Taruh file (.jpg/.png/.webp) di public/gallery/
// 2. Tambah item ke array GALLERY di bawah
// 3. Set span: 'lg' (2×2 highlight), 'md' (1×2 potret), 'sm'/kosong (1×1)
// Nanti bisa diperluas dengan type:'image'|'video' + poster untuk video.
export const GALLERY: GalleryItem[] = [
  {
    id: 'g-01',
    src: '/gallery/g-01.svg',
    width: 1200,
    height: 800,
    alt_id: 'Cupping session bareng 12 member',
    alt_en: 'Cupping session with 12 members',
    category_id: 'Event',
    category_en: 'Event',
    span: 'lg',
  },
  {
    id: 'g-02',
    src: '/gallery/g-02.svg',
    width: 1080,
    height: 1350,
    alt_id: 'Latte art dari Adhitya',
    alt_en: 'Latte art by Adhitya',
    category_id: 'Latte',
    category_en: 'Latte',
    span: 'md',
  },
  {
    id: 'g-03',
    src: '/gallery/g-03.svg',
    width: 1080,
    height: 1080,
    alt_id: 'Pagi Blend — edisi pertama',
    alt_en: 'Pagi Blend — first edition',
    category_id: 'Kopi',
    category_en: 'Coffee',
    span: 'sm',
  },
  {
    id: 'g-04',
    src: '/gallery/g-04.svg',
    width: 1080,
    height: 1080,
    alt_id: 'Foto bareng meet-up Jakarta',
    alt_en: 'Jakarta meet-up group photo',
    category_id: 'Event',
    category_en: 'Event',
    span: 'sm',
  },
  {
    id: 'g-05',
    src: '/gallery/g-05.svg',
    width: 1080,
    height: 1350,
    alt_id: 'Tulip latte art',
    alt_en: 'Tulip latte art',
    category_id: 'Latte',
    category_en: 'Latte',
    span: 'md',
  },
  {
    id: 'g-06',
    src: '/gallery/g-06.svg',
    width: 1600,
    height: 900,
    alt_id: 'Workshop latte art suasana kelas',
    alt_en: 'Latte art workshop classroom',
    category_id: 'Event',
    category_en: 'Event',
    span: 'lg',
  },
  {
    id: 'g-07',
    src: '/gallery/g-07.svg',
    width: 1080,
    height: 1080,
    alt_id: 'Home brew setup member',
    alt_en: 'Member home brew setup',
    category_id: 'Kopi',
    category_en: 'Coffee',
    span: 'sm',
  },
  {
    id: 'g-08',
    src: '/gallery/g-08.svg',
    width: 1080,
    height: 1080,
    alt_id: 'V60 pour over proses',
    alt_en: 'V60 pour over process',
    category_id: 'Kopi',
    category_en: 'Coffee',
    span: 'sm',
  },
  {
    id: 'g-09',
    src: '/gallery/g-09.svg',
    width: 1080,
    height: 1350,
    alt_id: 'Rosetta latte art close-up',
    alt_en: 'Rosetta latte art close-up',
    category_id: 'Latte',
    category_en: 'Latte',
    span: 'sm',
  },
  {
    id: 'g-10',
    src: '/gallery/g-10.svg',
    width: 1200,
    height: 800,
    alt_id: "Brewer's Daily Kit unboxing",
    alt_en: "Brewer's Daily Kit unboxing",
    category_id: 'Kopi',
    category_en: 'Coffee',
    span: 'sm',
  },
];

export const CATEGORIES = [
  { id: 'Event', en: 'Event' },
  { id: 'Kopi', en: 'Coffee' },
  { id: 'Latte', en: 'Latte' },
];
