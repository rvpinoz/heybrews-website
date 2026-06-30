import { auth } from '@/auth';
import { redirect, notFound } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import GalleryForm from '@/components/admin/GalleryForm';
import { prisma } from '@/lib/prisma';
import { updateGalleryItem } from '../../actions';

export default async function EditGalleryItemPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const { id } = await params;
  const item = await prisma.galleryItem.findUnique({ where: { id } });
  if (!item) notFound();

  const updateWithId = updateGalleryItem.bind(null, id);

  return (
    <AdminShell user={session.user}>
      <h1 className="text-2xl font-bold">Edit Foto</h1>
      <div className="mt-6">
        <GalleryForm
          action={updateWithId}
          submitLabel="Simpan Perubahan"
          initial={{
            src: item.src,
            width: item.width,
            height: item.height,
            altId: item.altId,
            altEn: item.altEn,
            categoryId: item.categoryId,
            categoryEn: item.categoryEn,
            span: item.span,
          }}
        />
      </div>
    </AdminShell>
  );
}
