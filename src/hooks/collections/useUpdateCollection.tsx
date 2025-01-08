"use client";

import { useToast } from "@/components/ui/use-toast";
import { useCallback, useState } from "react";

export function useUpdateCollection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const updateCollection = useCallback(
    async (collectionId: string, payload: { collectionName: string }) => {
      setLoading(true);
      try {
        const req = await fetch(`/api/collection/${collectionId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        if (req.status === 200) {
          toast({
            title: "Edit collection!",
            description: `Renamed to ${payload.collectionName} successfully.`,
          });
        }
      } catch (err: any) {
        console.error(err);
        return toast({
          title: "Uh oh! Couldn't create collection",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    updateCollection,
    loading,
  };
}
