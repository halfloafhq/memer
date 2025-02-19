'use client';

import { useToast } from '@/components/ui/use-toast';
import { Collection } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';

export function useFetchCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchCollections = useCallback(async () => {
    setLoading(true);
    try {
      const req = await fetch('/api/collections');
      const res = await req.json();
      if (req.status === 200) {
        setCollections(res.data);
      }
    } catch (err: any) {
      toast({
        title: "Uh oh! Couldn't fetch collections",
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return {
    collections,
    loading,
    refetch: fetchCollections,
  };
}
