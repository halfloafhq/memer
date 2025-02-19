'use client';

import { useToast } from '@/components/ui/use-toast';
import { CollectionWithMemes } from '@/types/collection';
import { useCallback, useState } from 'react';

export function useFetchCollectionWithMemes() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [collectionWithMemes, setCollectionWithMemes] = useState<CollectionWithMemes | undefined>(
    undefined
  );

  const fetchCollectionWithMemes = useCallback(
    async (collectionId: string) => {
      try {
        setLoading(true);
        const req = await fetch(`/api/collections/${collectionId}`);
        const res = await req.json();
        if (req.status === 200) {
          setCollectionWithMemes(res.data);
        }
      } catch (err: any) {
        toast({
          title: "Uh oh! Couldn't get collection",
          description: err.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  return {
    collectionWithMemes,
    refetch: fetchCollectionWithMemes,
    loading,
  };
}
