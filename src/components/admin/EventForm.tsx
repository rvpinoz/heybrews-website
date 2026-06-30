'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { compressImage } from '@/lib/compress-image';

export interface EventFormValues {
  id?: string;
  img?: string;
  date?: string;
  titleId?: string;
  titleEn?: string;
  descId?: string;
  descEn?: string;
  tagId?: string;
  tagEn?: string;
}

export default function EventForm({
  initial,
  action,
  submitLabel,
}: {
  initial?: EventFormValues;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  const [preview, setPreview] = useState<string | null>(initial?.img ?? null);
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setCompressing(true);
    const compressed = await compressImage(file);
    setCompressing(false);

    if (compressed !== file && fileInputRef.current) {
      // Swap the input's FileList so the real <form> submission uses the compressed file
      const dt = new DataTransfer();
      dt.items.add(compressed);
      fileInputRef.current.files = dt.files;
      setPreview(URL.createObjectURL(compressed));
    }
  };

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <input type="hidden" name="img" value={initial?.img ?? ''} />

      {/* Image upload */}
      <div>
        <label className="block text-sm font-semibold">Gambar</label>
        {preview && (
          <div className="relative mt-2 h-40 w-full max-w-sm overflow-hidden rounded-lg border border-hairline bg-canvas-soft">
            <Image src={preview} alt="" fill className="object-cover" unoptimized />
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-2 block text-sm"
        />
        {compressing && (
          <p className="mt-1 text-xs text-ink-muted">Mengompres gambar...</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold">Tanggal</label>
        <input
          type="date"
          name="date"
          defaultValue={initial?.date}
          required
          className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold">Judul (ID)</label>
          <input
            name="titleId"
            defaultValue={initial?.titleId}
            required
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Judul (EN)</label>
          <input
            name="titleEn"
            defaultValue={initial?.titleEn}
            required
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold">Deskripsi (ID)</label>
          <textarea
            name="descId"
            defaultValue={initial?.descId}
            required
            rows={3}
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Deskripsi (EN)</label>
          <textarea
            name="descEn"
            defaultValue={initial?.descEn}
            required
            rows={3}
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold">Tag (ID)</label>
          <input
            name="tagId"
            defaultValue={initial?.tagId}
            required
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Tag (EN)</label>
          <input
            name="tagEn"
            defaultValue={initial?.tagEn}
            required
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-active"
      >
        {submitLabel}
      </button>
    </form>
  );
}
