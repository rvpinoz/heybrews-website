import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AdminShell from '@/components/admin/AdminShell';
import { prisma } from '@/lib/prisma';
import DeleteMemberButton from './DeleteMemberButton';

export default async function AdminMembersPage() {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const members = await prisma.member.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] });

  return (
    <AdminShell user={session.user}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Members</h1>
        <Link
          href="/admin/members/new"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-primary-active"
        >
          + Tambah Member
        </Link>
      </div>

      {members.length === 0 ? (
        <p className="mt-6 rounded-xl border border-hairline bg-canvas p-8 text-center text-sm text-ink-muted">
          Belum ada member. Klik &ldquo;+ Tambah Member&rdquo; untuk menambah yang pertama.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:grid-cols-2">
          {members.map((member) => (
            <div key={member.id} className="group relative">
              <Link href={`/admin/members/${member.id}/edit`} className="block">
                <div className="overflow-hidden rounded-lg border border-hairline bg-canvas">
                  <div className="relative aspect-square bg-canvas-soft">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="truncate text-[13px] font-bold">{member.name}</p>
                    <p className="truncate text-[11px] text-ink-muted">{member.handle}</p>
                  </div>
                </div>
              </Link>
              <DeleteMemberButton id={member.id} label={member.name} />
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
