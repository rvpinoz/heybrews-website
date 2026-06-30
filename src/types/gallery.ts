export interface GalleryRecord {
  id: string;
  src: string;
  width: number;
  height: number;
  altId: string;
  altEn: string;
  categoryId: string;
  categoryEn: string;
  span: 'sm' | 'md' | 'lg';
}
