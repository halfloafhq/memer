import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export function CollectionNotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        Collection not found
      </h1>
      <Link
        href="/dashboard/collections"
        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 dark:text-white"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        <span className="hidden sm:block text-xl">Back to Collections</span>
        <span className="block sm:hidden text-lg">Back</span>
      </Link>
    </div>
  );
}
