'use client';

import { useTransition } from 'react';
import { deleteGalleryItem } from './actions';

export default function DeleteGalleryButton({ id, label }: { id: string; label: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Hapus foto "${label}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    startTransition(() => deleteGalleryItem(id));
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-red-600 disabled:opacity-100 group-hover:opacity-100"
      aria-label="Hapus"
    >
      {isPending ? (
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
    </button>
  );
}
