'use client';

import { useToast } from '@/components/ui/use-toast';
import { useCallback, useState } from 'react';

export function useUploadMeme() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const uploadMeme = useCallback(
    async (
      name: string,
      description: string,
      tags: string[],
      imageUrl: string,
      fileKey: string | null,
      onSuccess?: () => void
    ) => {
      try {
        setLoading(true);
        const req = await fetch('/api/memes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            memeName: name,
            memeDescription: description,
            memeTags: tags,
            memeImageURL: imageUrl,
            memeFileKey: fileKey,
          }),
        });
        if (!req.ok) {
          const res = await req.json();
          return toast({
            title: 'Upload Failed',
            description: res.message || 'There was an error uploading the meme. Please try again.',
            variant: 'destructive',
          });
        }

        onSuccess?.();

        toast({
          title: 'Meme uploaded successfully!',
          description: `Meme ${name} has been uploaded!.`,
        });
      } catch (err) {
        return toast({
          title: 'Upload Failed',
          description: 'There was an error uploading the meme. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  return {
    uploadMeme,
    loading,
  };
}
