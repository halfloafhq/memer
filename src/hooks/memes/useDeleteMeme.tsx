import { useToast } from '@/components/ui/use-toast';
import { useCallback, useState } from 'react';

export function useDeleteMeme() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteMeme = useCallback(
    async (memeId: string) => {
      try {
        setLoading(true);
        const res = await fetch(`/api/memes/${memeId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          toast({
            title: 'Meme deleted',
            description: 'The meme has been deleted',
          });
        }
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  return {
    deleteMeme,
    loading,
  };
}
