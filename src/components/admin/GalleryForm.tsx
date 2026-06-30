'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { compressImage } from '@/lib/compress-image';

export interface GalleryFormValues {
  id?: string;
  src?: string;
  width?: number;
  height?: number;
  altId?: string;
  altEn?: string;
  categoryId?: string;
  categoryEn?: string;
  span?: 'sm' | 'md' | 'lg';
}

export default function GalleryForm({
  initial,
  action,
  submitLabel,
}: {
  initial?: GalleryFormValues;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  const [preview, setPreview] = useState<string | null>(initial?.src ?? null);
  const [dims, setDims] = useState({ width: initial?.width ?? 1200, height: initial?.height ?? 800 });
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
      const dt = new DataTransfer();
      dt.items.add(compressed);
      fileInputRef.current.files = dt.files;
    }

    const finalFile = fileInputRef.current?.files?.[0] ?? compressed;
    setPreview(URL.createObjectURL(finalFile));

    const bitmap = await createImageBitmap(finalFile);
    setDims({ width: bitmap.width, height: bitmap.height });
  };

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <input type="hidden" name="src" value={initial?.src ?? ''} />
      <input type="hidden" name="width" value={dims.width} />
      <input type="hidden" name="height" value={dims.height} />

      <div>
        <label className="block text-sm font-semibold">Gambar</label>
        {preview && (
          <div className="relative mt-2 h-40 w-40 overflow-hidden rounded-lg border border-hairline bg-canvas-soft">
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
        {compressing && <p className="mt-1 text-xs text-ink-muted">Mengompres gambar...</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold">Ukuran tile</label>
        <select
          name="span"
          defaultValue={initial?.span ?? 'sm'}
          className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
        >
          <option value="sm">Kecil (1×1)</option>
          <option value="md">Sedang (1×2, potret)</option>
          <option value="lg">Besar (2×2, highlight)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold">Kategori (ID)</label>
          <input
            name="categoryId"
            defaultValue={initial?.categoryId}
            required
            placeholder="mis. Event, Kopi, Latte"
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Kategori (EN)</label>
          <input
            name="categoryEn"
            defaultValue={initial?.categoryEn}
            required
            placeholder="e.g. Event, Coffee, Latte"
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold">Alt/caption (ID)</label>
          <input
            name="altId"
            defaultValue={initial?.altId}
            required
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Alt/caption (EN)</label>
          <input
            name="altEn"
            defaultValue={initial?.altEn}
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
