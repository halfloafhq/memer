import { useToast } from "@/components/ui/use-toast";
import { useCallback, useState } from "react";

export function usePostMemeToCollection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const postMemeToCollection = useCallback(
    async (
      memeId: string,
      collectionId: string,
      memeName: string,
      collectionName: string,
    ) => {
      try {
        setLoading(true);
        const req = await fetch(`/api/collections/${collectionId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collectionId,
            memeId,
          }),
        });
        if (!req.ok) {
          const res = await req.json();
          return toast({
            title: "Save Failed",
            description:
              res.message ||
              "There was an error saving the meme to the collection. Please try again.",
            variant: "destructive",
          });
        }
        toast({
          title: "Saved!",
          description: `${memeName} has been saved to ${collectionName}.`,
        });
      } catch (err) {
        return toast({
          title: "Save Failed",
          description:
            "There was an error saving the meme to the collection. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast],
  );

  return {
    postMemeToCollection,
    loading,
  };
}
