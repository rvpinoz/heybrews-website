'use client';

import { useTransition } from 'react';
import { deleteEvent } from './actions';

export default function DeleteEventButton({ id, title }: { id: string; title: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Hapus event "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    startTransition(() => deleteEvent(id));
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-600 transition-opacity hover:underline disabled:opacity-50"
    >
      {isPending ? 'Menghapus...' : 'Hapus'}
    </button>
  );
}
