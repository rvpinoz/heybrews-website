import { auth } from '@/auth';
import { redirect, notFound } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import MemberForm from '@/components/admin/MemberForm';
import { prisma } from '@/lib/prisma';
import { updateMember } from '../../actions';

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const { id } = await params;
  const member = await prisma.member.findUnique({ where: { id } });
  if (!member) notFound();

  const updateWithId = updateMember.bind(null, id);

  return (
    <AdminShell user={session.user}>
      <h1 className="text-2xl font-bold">Edit Member</h1>
      <div className="mt-6">
        <MemberForm
          action={updateWithId}
          submitLabel="Simpan Perubahan"
          initial={{
            img: member.img,
            handle: member.handle,
            name: member.name,
            fid: member.fid,
            fen: member.fen,
            bioId: member.bioId,
            bioEn: member.bioEn,
            link: member.link,
            order: member.order,
          }}
        />
      </div>
    </AdminShell>
  );
}
