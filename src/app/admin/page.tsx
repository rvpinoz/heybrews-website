import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';

const ACTIVE_MODULES = [
  { name: 'Events', desc: 'Kelola event dan kolaborasi', href: '/admin/events' },
  { name: 'Gallery', desc: 'Foto dan video komunitas', href: '/admin/gallery' },
];

const UPCOMING_MODULES = [
  { name: 'Blog', desc: 'Artikel dan cerita kopi' },
  { name: 'Member', desc: 'Data member HeyBrews' },
];

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  return (
    <AdminShell user={session.user}>
      <h1 className="text-2xl font-bold">
        Halo, {session.user.name ?? 'Admin'} 👋
      </h1>
      <p className="mt-1 text-sm text-ink-muted">
        Role: <span className="font-semibold capitalize">{session.user.role?.toLowerCase()}</span>
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        {ACTIVE_MODULES.map((mod) => (
          <Link
            key={mod.name}
            href={mod.href}
            className="block rounded-xl border border-hairline bg-canvas p-6 no-underline transition-colors hover:border-primary"
          >
            <h3 className="text-lg font-bold text-ink">{mod.name}</h3>
            <p className="mt-1 text-sm text-ink-muted">{mod.desc}</p>
          </Link>
        ))}
        {UPCOMING_MODULES.map((mod) => (
          <div
            key={mod.name}
            className="rounded-xl border border-hairline bg-canvas p-6"
          >
            <h3 className="text-lg font-bold">{mod.name}</h3>
            <p className="mt-1 text-sm text-ink-muted">{mod.desc}</p>
            <span className="mt-3 inline-block rounded-full bg-canvas-soft px-3 py-1 text-xs font-medium text-ink-faint">
              Segera hadir
            </span>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
