'use client';
import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Meme from './meme';
import Image from 'next/image';
import SaveMeme from './save-meme';
import { Button } from '../ui/button';
import { Edit, FileDown } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { downloadMeme } from '@/utils/download';
import { useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import ImportToEditor from '../import-to-editor';

type MemeCardProps = {
  memeId: string;
  src: string;
  name: string;
  description: string;
};

export default function MemeCard({ src, name, description, memeId }: MemeCardProps) {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const handleEdit = (memeId: string) => {
    router.push(`/admin/dashboard/edit?memeId=${memeId}`);
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      const success = await downloadMeme(src, name);
      if (!success) {
        toast({
          title: 'Download Failed',
          description: 'There was an error downloading the image. Please try again.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Downloaded!',
          description: `${name} has been downloaded.`,
        });
      }
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: 'Download Failed',
        description: 'There was an error downloading the image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsAdmin(user?.publicMetadata.role === 'admin');
  }, [user]);

  return (
    <Sheet>
      <SheetTrigger className="w-full sm:w-auto">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-gray-600 duration-300 ">
          <Meme src={src} name={name} />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl sm:text-2xl">{name}</SheetTitle>
          <SheetDescription className="text-left text-sm sm:text-base">
            {description}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-center mt-4 gap-4">
          <Image
            src={src}
            alt={name}
            width={400}
            height={400}
            objectFit="contain"
            className="object-contain w-full bg-muted"
            priority
          />
          <Button onClick={handleDownload} className="w-full sm:w-auto">
            <FileDown className="mr-2" />
            {loading ? 'Downloading...' : 'Download'}
          </Button>
          {user && <SaveMeme src={src} name={name} memeId={memeId} />}
          <ImportToEditor src={src} />
          {isAdmin && (
            <Button variant="outline" onClick={() => handleEdit(memeId)}>
              <div className="flex items-center gap-2">
                <Edit className="mr-2 h-5 w-5" />
                Edit meme
              </div>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

MemeCard.Skeleton = function MemeCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Skeleton className="h-[250px] w-[250px] rounded-xl" />
    </div>
  );
};
