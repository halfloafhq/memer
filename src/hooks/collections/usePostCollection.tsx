"use client";

import { useToast } from "@/components/ui/use-toast";
import { useCallback, useState } from "react";

export function usePostCollection() {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const postCollection = useCallback(async (name: string) => {
    setLoading(true);
    try {
      const req = await fetch("/api/collection/", {
        method: "POST",
        body: JSON.stringify({
          collectionName: name,
        }),
      });
      if (req.status === 201) {
        toast({
          title: "Created collection!",
          description: `${name} was created successfully.`,
        });
      }
    } catch (err: any) {
      toast({
        title: "Uh oh! Couldn't fetch collections",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    postCollection,
    loading,
  };
}
