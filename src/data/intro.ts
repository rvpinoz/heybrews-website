export interface IntroItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt_id: string;
  alt_en: string;
}

// Cara menambah item: tambahkan object ke array di bawah.
// Foto: taruh file di public/intro/, isi src saja.
// Video: taruh file + poster (thumbnail) di public/intro/, isi keduanya.
export const INTRO_ITEMS: IntroItem[] = [
  {
    id: 'clip-1',
    type: 'video',
    src: '/intro/hero-web.mp4',
    poster: '/intro/hero-web-poster.jpg',
    alt_id: 'Cuplikan video kenalan HeyBrews',
    alt_en: 'HeyBrews intro video clip',
  },
  {
    id: 'foto-1',
    type: 'image',
    src: '/intro/foto-1.svg',
    alt_id: 'Member HeyBrews lagi ngopi bareng',
    alt_en: 'HeyBrews members hanging out over coffee',
  },
  {
    id: 'foto-2',
    type: 'image',
    src: '/intro/foto-2.svg',
    alt_id: 'Sesi brewing bareng komunitas',
    alt_en: 'Community brewing session',
  },
];
