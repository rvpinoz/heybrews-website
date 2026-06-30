import { auth } from '@/auth';
import { redirect, notFound } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import EventForm from '@/components/admin/EventForm';
import { prisma } from '@/lib/prisma';
import { updateEvent } from '../../actions';

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  const updateWithId = updateEvent.bind(null, id);

  return (
    <AdminShell user={session.user}>
      <h1 className="text-2xl font-bold">Edit Event</h1>
      <div className="mt-6">
        <EventForm
          action={updateWithId}
          submitLabel="Simpan Perubahan"
          initial={{
            img: event.img,
            date: event.date.toISOString().slice(0, 10),
            titleId: event.titleId,
            titleEn: event.titleEn,
            descId: event.descId,
            descEn: event.descEn,
            tagId: event.tagId,
            tagEn: event.tagEn,
          }}
        />
      </div>
    </AdminShell>
  );
}
