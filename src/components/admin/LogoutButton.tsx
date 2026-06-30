'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="w-full rounded-lg px-3 py-2 text-left text-[13px] font-medium text-ink-muted transition-colors hover:bg-canvas-soft hover:text-ink"
    >
      Logout
    </button>
  );
}
