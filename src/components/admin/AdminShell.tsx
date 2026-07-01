'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/BrandLogo';
import { cn } from '@/lib/utils';
import LogoutButton from './LogoutButton';

const NAV = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Events', href: '/admin/events' },
  { label: 'Gallery', href: '/admin/gallery' },
  { label: 'Members', href: '/admin/members' },
];

const COMING_SOON = ['Blog'];

export default function AdminShell({
  user,
  children,
}: {
  user: { name?: string | null; image?: string | null; role?: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-canvas-soft">
      {/* Sidebar */}
      <aside className="flex w-[240px] shrink-0 flex-col border-r border-hairline bg-canvas max-md:hidden">
        <div className="flex items-center gap-2.5 border-b border-hairline px-5 py-4">
          <BrandLogo className="h-8 w-8 rounded-lg" />
          <span className="text-[16px] font-bold tracking-tight">HeyBrews</span>
        </div>

        <nav className="flex-1 px-3 py-4">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
            Menu
          </p>
          {NAV.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'mb-0.5 block rounded-lg px-3 py-2 text-[14px] font-medium no-underline transition-colors',
                  isActive
                    ? 'bg-primary/8 text-primary'
                    : 'text-ink-muted hover:bg-canvas-soft hover:text-ink',
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <p className="mb-2 mt-6 px-2 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
            Konten (segera)
          </p>
          {COMING_SOON.map((label) => (
            <span
              key={label}
              className="mb-0.5 block cursor-default rounded-lg px-3 py-2 text-[14px] text-ink-faint"
            >
              {label}
            </span>
          ))}
        </nav>

        <div className="border-t border-hairline px-3 py-3">
          <LogoutButton />
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between border-b border-hairline bg-canvas px-6 py-3">
          <h2 className="text-[14px] font-semibold text-ink-muted">Admin</h2>
          <div className="flex items-center gap-3">
            {user.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt=""
                className="h-8 w-8 rounded-full"
                referrerPolicy="no-referrer"
              />
            )}
            <span className="text-[13px] font-medium">{user.name}</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
