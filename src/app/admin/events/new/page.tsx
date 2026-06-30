import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import EventForm from '@/components/admin/EventForm';
import { createEvent } from '../actions';

export default async function NewEventPage() {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  return (
    <AdminShell user={session.user}>
      <h1 className="text-2xl font-bold">Tambah Event</h1>
      <div className="mt-6">
        <EventForm action={createEvent} submitLabel="Simpan Event" />
      </div>
    </AdminShell>
  );
}
