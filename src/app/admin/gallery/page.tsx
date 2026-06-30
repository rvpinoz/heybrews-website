import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AdminShell from '@/components/admin/AdminShell';
import { prisma } from '@/lib/prisma';
import DeleteGalleryButton from './DeleteGalleryButton';

export default async function AdminGalleryPage() {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const items = await prisma.galleryItem.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell user={session.user}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <Link
          href="/admin/gallery/new"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-primary-active"
        >
          + Tambah Foto
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 rounded-xl border border-hairline bg-canvas p-8 text-center text-sm text-ink-muted">
          Belum ada foto. Klik &ldquo;+ Tambah Foto&rdquo; untuk menambah yang pertama.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="group relative">
              <Link href={`/admin/gallery/${item.id}/edit`} className="block">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-hairline bg-canvas-soft">
                  <Image
                    src={item.src}
                    alt={item.altId}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                  <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-5 text-[11px] font-semibold text-white">
                    {item.categoryId} · {item.span}
                  </span>
                </div>
              </Link>
              <DeleteGalleryButton id={item.id} label={item.altId} />
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
