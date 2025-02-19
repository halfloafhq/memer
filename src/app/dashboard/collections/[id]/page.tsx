'use client';
import React from 'react';
import Loader from '@/components/loaders/loader';
import { useFetchCollection } from '@/hooks/collections/useFetchCollection';
import { CollectionHeader } from '@/components/collections/collection-header';
import { CollectionNotFound } from '@/components/collections/collection-not-found';
import { CollectionMemeCard } from '@/components/collections/collection-meme-card';
import { removeMemeFromCollectionAction } from './_actions';

export default function CollectionPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { collectionWithMemes, loading, refetch } = useFetchCollection(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1 min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!collectionWithMemes) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full min-h-screen">
        <CollectionNotFound />
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full min-h-screen">
      <>
        <CollectionHeader
          collectionId={collectionWithMemes.id}
          collectionName={collectionWithMemes.name}
          onEditCollectionSuccess={refetch}
        />
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Memes in this Collection</h2>
          {collectionWithMemes.memes && collectionWithMemes.memes.length >= 1 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {collectionWithMemes.memes.map((memeCollection) => (
                <CollectionMemeCard
                  key={memeCollection.meme.id}
                  url={memeCollection.meme.url}
                  name={memeCollection.meme.name}
                  description={memeCollection.meme.description}
                  collectionId={memeCollection.collectionId}
                  memeCollectionId={memeCollection.id}
                  onDeleteSuccess={refetch}
                  onRemoveMemeFromCollection={removeMemeFromCollectionAction}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No memes in this collection yet.</p>
          )}
        </div>
      </>
    </main>
  );
}
