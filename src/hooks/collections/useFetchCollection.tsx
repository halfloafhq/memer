"use client";

import { useToast } from "@/components/ui/use-toast";
import { CollectionWithMemes } from "@/types/collection";
import { useCallback, useEffect, useState } from "react";

export function useFetchCollection(id: string) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [collectionWithMemes, setCollectionWithMemes] = useState<
    CollectionWithMemes | undefined
  >(undefined);

  const getCollectionById = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const req = await fetch(`/api/collection/${id}`);
        const res = await req.json();
        if (req.status === 200) {
          setCollectionWithMemes(res.data);
        }
      } catch (err: any) {
        toast({
          title: "Uh oh! Couldn't get collection",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast],
  );

  useEffect(() => {
    getCollectionById(id);
  }, [id, getCollectionById]);

  return { collectionWithMemes, loading, refetch: getCollectionById };
}
