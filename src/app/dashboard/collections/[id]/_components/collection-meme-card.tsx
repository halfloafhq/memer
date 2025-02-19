import Image from 'next/image';
import React from 'react';
import MoreInfo from './more-info';

interface CollectionMemeCardProps {
  url: string;
  name: string;
  description: string;
  collectionId: string;
  memeCollectionId: string;
  onDeleteSuccess: (id: string) => Promise<void>;
}

export function CollectionMemeCard({
  url,
  name,
  description,
  collectionId,
  memeCollectionId,
  onDeleteSuccess,
}: CollectionMemeCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm dark:bg-secondary dark:border-gray-700 relative">
      <div className="relative aspect-square mb-2">
        <Image src={url} alt={name} layout="fill" objectFit="cover" className="rounded-md" />
      </div>
      <p className="text-center dark:text-white">{name ?? 'Meme'}</p>
      <MoreInfo
        src={url}
        name={name}
        description={description}
        collectionId={collectionId}
        memeCollectionId={memeCollectionId}
        className="absolute top-2 right-2 p-1 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 border border-black/15"
        onDeleteSuccess={onDeleteSuccess}
      />
    </div>
  );
}
