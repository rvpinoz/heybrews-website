import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import MemberForm from '@/components/admin/MemberForm';
import { createMember } from '../actions';

export default async function NewMemberPage() {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  return (
    <AdminShell user={session.user}>
      <h1 className="text-2xl font-bold">Tambah Member</h1>
      <div className="mt-6">
        <MemberForm action={createMember} submitLabel="Simpan Member" />
      </div>
    </AdminShell>
  );
}
