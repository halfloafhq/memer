import CollectionDialog from './collection-dialog';
import React from 'react';

interface EmptyCollectionProps {
  onCreateSuccess: () => Promise<void>;
}

export function EmptyCollections({ onCreateSuccess }: EmptyCollectionProps) {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Collections</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-5 text-center p-10">
          <h3 className="text-3xl font-bold tracking-tight">You have no collections</h3>
          <p className="text-sm text-muted-foreground">
            You can start saving memes to a collection
          </p>
          <CollectionDialog onSuccess={onCreateSuccess} />
        </div>
      </div>
    </>
  );
}
