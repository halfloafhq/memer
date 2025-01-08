import React from "react";
import { EditCollection } from "./edit-collection";
import { DeleteCollection } from "./delete-collection";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface CollectionHeaderProps {
  collectionId: string;
  collectionName: string;
  onEditCollectionSuccess: (id: string) => Promise<void>;
}

export function CollectionHeader({
  collectionId,
  collectionName,
  onEditCollectionSuccess,
}: CollectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {collectionName}
        </h1>
        <EditCollection
          collectionId={collectionId}
          name={collectionName}
          onSuccess={onEditCollectionSuccess}
        />
        <DeleteCollection collectionId={collectionId} />
      </div>
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
