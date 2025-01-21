"use client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function useDeleteCollection() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteCollection = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const res = await fetch("/api/collections", {
          method: "DELETE",
          body: JSON.stringify({
            collectionId: id,
          }),
        });

        if (res.ok) {
          toast({
            title: "Collection deleted!",
            description: "Collection was successfully deleted",
          });
          router.push("/dashboard/collections");
        }
      } catch (err) {
        const error = err as Error;
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    },
    [router, toast],
  );

  return {
    deleteCollection,
    loading,
  };
}
