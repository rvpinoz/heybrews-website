import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AdminShell from '@/components/admin/AdminShell';
import { prisma } from '@/lib/prisma';
import DeleteEventButton from './DeleteEventButton';

export default async function AdminEventsPage() {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const events = await prisma.event.findMany({ orderBy: { date: 'desc' } });

  return (
    <AdminShell user={session.user}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link
          href="/admin/events/new"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-primary-active"
        >
          + Tambah Event
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-hairline bg-canvas">
        {events.length === 0 ? (
          <p className="p-8 text-center text-sm text-ink-muted">
            Belum ada event. Klik &ldquo;+ Tambah Event&rdquo; untuk membuat yang pertama.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-hairline text-ink-faint">
                <th className="px-4 py-3 font-medium">Gambar</th>
                <th className="px-4 py-3 font-medium">Judul</th>
                <th className="px-4 py-3 font-medium">Tanggal</th>
                <th className="px-4 py-3 font-medium">Tag</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className="border-b border-hairline last:border-0">
                  <td className="px-4 py-3">
                    <div className="relative h-12 w-20 overflow-hidden rounded-md bg-canvas-soft">
                      <Image src={e.img} alt={e.titleId} fill className="object-cover" unoptimized />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{e.titleId}</td>
                  <td className="px-4 py-3 text-ink-muted">
                    {e.date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{e.tagId}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/events/${e.id}/edit`}
                        className="text-primary no-underline hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteEventButton id={e.id} title={e.titleId} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminShell>
  );
}
