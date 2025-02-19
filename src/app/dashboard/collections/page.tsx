'use client';
import Loader from '@/components/loaders/loader';
import { useRouter } from 'next/navigation';
import { useFetchCollections } from '@/hooks/collections/useFetchCollections';
import CollectionDialog from '@/components/collections/collection-dialog';
import { CollectionCard } from '@/components/collections/collection-card';
import { EmptyCollections } from '@/components/collections/empty-collections';

export default function CollectionsPage() {
  const { collections, loading, refetch } = useFetchCollections();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1 min-h-screen">
        <Loader />
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-4 min-h-screen">
        <EmptyCollections onCreateSuccess={refetch} />
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Collections</h2>
        <CollectionDialog onSuccess={refetch} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            name={collection.name}
            onClick={() => router.push(`/dashboard/collections/${collection.id}`)}
          />
        ))}
      </div>
    </main>
  );
}
