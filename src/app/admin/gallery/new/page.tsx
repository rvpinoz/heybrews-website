import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import GalleryForm from '@/components/admin/GalleryForm';
import { createGalleryItem } from '../actions';

export default async function NewGalleryItemPage() {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  return (
    <AdminShell user={session.user}>
      <h1 className="text-2xl font-bold">Tambah Foto</h1>
      <div className="mt-6">
        <GalleryForm action={createGalleryItem} submitLabel="Simpan Foto" />
      </div>
    </AdminShell>
  );
}
