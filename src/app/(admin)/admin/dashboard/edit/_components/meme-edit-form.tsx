import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { CloudUpload, X, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import UploadBtn from '@/components/image-upload-button';
import { useUpload } from '@/hooks/useUpload';
import { useToast } from '@/components/ui/use-toast';
import { DeleteMeme } from '@/components/delete-meme';

const predefinedTags = [
  'Funny',
  'Relatable',
  'Wholesome',
  'Sarcastic',
  'Ironic',
  'Nostalgic',
  'Animals',
  'Politics',
  'Movies',
  'Gaming',
  'Sports',
  'Music',
  'Technology',
  'Science',
  'Food',
  'Fashion',
  'Art',
  'Literature',
  'Dark',
];

export default function MemeEditForm() {
  const searchParams = useSearchParams();
  const memeId = searchParams.get('memeId');
  const [memeName, setMemeName] = useState<string>('');
  const [memeDescription, setMemeDescription] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState<string>('');
  const [removingImage, setRemovingImage] = useState<boolean>(false);
  const { success, fileUrl, fileKey, setFileUrl, setSuccess, setFileKey } = useUpload();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (memeId) {
      fetchMemeData();
    }
  }, [memeId, fetchMemeData]);

  async function fetchMemeData() {
    try {
      const response = await fetch(`/api/memes/${memeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch meme data');
      }
      const { data } = await response.json();
      setMemeName(data.name);
      setMemeDescription(data.description);
      setSelectedTags(data.tags);
      setFileUrl(data.url);
      setFileKey(data.fileKey);
    } catch (error: any) {
      console.error('Error fetching meme data:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  }

  function handleTagSelection(tag: string) {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  function handleCustomTagAdd() {
    if (customTag && !selectedTags.includes(customTag)) {
      setSelectedTags([...selectedTags, customTag]);
      setCustomTag('');
    }
  }

  function removeTag(tag: string) {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  }

  async function handleUpdateMeme(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fileUrl) {
      toast({
        title: 'Meme update failed',
        description: 'No file uploaded',
        variant: 'destructive',
      });
      return;
    }
    if (memeName === '' || memeDescription === '') {
      toast({
        title: 'Meme update failed',
        description: 'Meme name or description is empty',
        variant: 'destructive',
      });
      return;
    }
    if (selectedTags.length === 0) {
      toast({
        title: 'Meme update failed',
        description: 'No tags selected',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/memes/${memeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memeName,
          memeDescription,
          memeTags: selectedTags,
          memeImageURL: fileUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update meme');
      }

      const { data: updatedMeme } = await response.json();
      toast({
        title: 'Meme updated successfully',
        description: `${updatedMeme.name} has been updated`,
      });
      setMemeName(updatedMeme.name);
      setMemeDescription(updatedMeme.description);
      setSelectedTags(updatedMeme.tags);
      setFileUrl(updatedMeme.url);
    } catch (error: any) {
      console.error('Error updating meme:', error);
      toast({
        title: 'Meme update failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveImage() {
    try {
      setRemovingImage(true);
      const res = await fetch('/api/memes/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memeFileKey: fileKey,
        }),
      });

      if (res.status === 200) {
        setFileUrl(null);
        setFileKey(null);
        setSuccess(false);
        toast({
          title: 'Image removed',
          description: 'Image removed successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to remove image',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to remove image',
        variant: 'destructive',
      });
    } finally {
      setRemovingImage(false);
    }
  }

  if (!memeId) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <h3 className="text-2xl font-bold">Kindly select a meme to edit</h3>
        <Link href="/">
          <Button className="text-md">Go to home</Button>
        </Link>
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={handleUpdateMeme}>
      <div className="grid gap-2">
        <Label htmlFor="meme-name" className="font-semibold">
          Meme Name
        </Label>
        <Input
          id="meme-name"
          type="text"
          className="text-md"
          placeholder="Rick Astley"
          onChange={(e) => setMemeName(e.target.value)}
          value={memeName}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="meme-tags" className="font-semibold">
          Meme Tags
        </Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="bg-gray-200 px-2 py-1 rounded-full flex items-center dark:bg-primary dark:text-white"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-400"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Select onValueChange={handleTagSelection}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              {predefinedTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="Custom tag"
            />
            <Button type="button" onClick={handleCustomTagAdd} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="meme-description" className="font-semibold">
          Meme Description
        </Label>
        <Textarea
          id="meme-description"
          className="min-h-[100px] text-md"
          placeholder="Describe your meme here"
          onChange={(e) => setMemeDescription(e.target.value)}
          value={memeDescription}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="meme-image" className="font-semibold">
          Meme Image
        </Label>
        {fileUrl ? (
          <div className="flex flex-col items-center justify-center relative">
            <Image
              width={300}
              height={300}
              src={fileUrl}
              layout="responsive"
              alt="Meme Preview"
              className="max-w-[720px] h-auto object-contain"
            />
            <Button
              variant="destructive"
              onClick={handleRemoveImage}
              disabled={removingImage}
              className="mt-2"
            >
              {removingImage ? (
                'Removing...'
              ) : (
                <>
                  <X className="h-4 w-4 mr-2" />
                  <span className="font-bold">Remove</span>
                </>
              )}
            </Button>
          </div>
        ) : (
          <UploadBtn setFileUrl={setFileUrl} setSuccess={setSuccess} setFileKey={setFileKey} />
        )}
      </div>
      <Button type="submit" className="mt-4" disabled={loading}>
        <CloudUpload className="mr-2" />
        {loading ? 'Updating...' : 'Update Meme'}
      </Button>
      <DeleteMeme memeId={memeId} />
    </form>
  );
}
