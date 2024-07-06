"use client";
import Link from "next/link";
import MemerIcon from "./memer-icon";
import ModeToggle from "./theme-button";
import { DashboardSheet } from "./dashboard-sheet";
import UserMenu from "./user-menu";

export default function Navbar() {
  return (
    <header className="flex h-16 w-full shrink-0 items-center px-4 py-8 md:px-6 bg-gray-950 text-gray-50 border-b border-gray-100">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <MemerIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Memer</span>
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <ModeToggle />
        <div className="block xl:hidden">
          <DashboardSheet />
        </div>
        <UserMenu />
      </div>
    </header>
  );
}
