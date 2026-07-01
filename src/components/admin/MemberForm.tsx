'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { compressImage } from '@/lib/compress-image';

export interface MemberFormValues {
  id?: string;
  img?: string;
  handle?: string;
  name?: string;
  fid?: string;
  fen?: string;
  bioId?: string;
  bioEn?: string;
  link?: string;
  order?: number;
}

export default function MemberForm({
  initial,
  action,
  submitLabel,
}: {
  initial?: MemberFormValues;
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
      const dt = new DataTransfer();
      dt.items.add(compressed);
      fileInputRef.current.files = dt.files;
      setPreview(URL.createObjectURL(compressed));
    }
  };

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <input type="hidden" name="img" value={initial?.img ?? ''} />

      <div>
        <label className="block text-sm font-semibold">Foto</label>
        {preview && (
          <div className="relative mt-2 h-32 w-32 overflow-hidden rounded-full border border-hairline bg-canvas-soft">
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold">Nama</label>
          <input
            name="name"
            defaultValue={initial?.name}
            required
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Handle Instagram</label>
          <input
            name="handle"
            defaultValue={initial?.handle}
            required
            placeholder="@username"
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold">Link Instagram</label>
        <input
          name="link"
          type="url"
          defaultValue={initial?.link}
          required
          placeholder="https://instagram.com/username"
          className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold">Fokus (ID)</label>
          <input
            name="fid"
            defaultValue={initial?.fid}
            required
            placeholder="mis. Latte art"
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Fokus (EN)</label>
          <input
            name="fen"
            defaultValue={initial?.fen}
            required
            placeholder="e.g. Latte art"
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold">Bio (ID)</label>
          <textarea
            name="bioId"
            defaultValue={initial?.bioId}
            required
            rows={3}
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Bio (EN)</label>
          <textarea
            name="bioEn"
            defaultValue={initial?.bioEn}
            required
            rows={3}
            className="mt-1 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold">Urutan tampil</label>
        <input
          name="order"
          type="number"
          defaultValue={initial?.order ?? 0}
          className="mt-1 w-32 rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-ink-faint">Angka lebih kecil tampil lebih dulu.</p>
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
