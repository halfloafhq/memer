'use client';
import Link from 'next/link';
import MemerIcon from './memer-icon';
import ModeToggle from './theme-button';
import { DashboardSheet } from './dashboard-sheet';
import UserMenu from './user-menu';

export default function Navbar() {
  const homeHref = '/?search=';
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center px-4 py-8 md:px-6 bg-gray-950 text-gray-50 border-b border-gray-100">
      <Link href={homeHref} className="flex items-center gap-2" prefetch={false}>
        <MemerIcon className="h-9 w-9 text-primary" />
        <span className="hidden sm:block text-lg font-semibold">Memer</span>
      </Link>
      <div className="ml-auto flex items-center justify-center gap-4">
        <ModeToggle />
        <DashboardSheet />
        <UserMenu />
      </div>
    </header>
  );
}
