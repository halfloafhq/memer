import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { CloudUpload, X, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import UploadBtn from "@/components/image-upload-button";
import { useUpload } from "@/hooks/useUpload";
import { useToast } from "@/components/ui/use-toast";

const predefinedTags = [
  "Funny",
  "Relatable",
  "Wholesome",
  "Sarcastic",
  "Ironic",
  "Nostalgic",
  "Animals",
  "Politics",
  "Movies",
  "Gaming",
  "Sports",
  "Music",
  "Technology",
  "Science",
  "Food",
  "Fashion",
  "Art",
  "Literature",
  "Dark",
];

export default function MemeUploadForm() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState<string>("");
  const { success, fileUrl, setFileUrl, setSuccess } = useUpload();
  const [memeName, setMemeName] = useState<string>("");
  const [memeDescription, setMemeDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  function handleTagSelection(tag: string) {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  function handleCustomTagAdd() {
    if (customTag && !selectedTags.includes(customTag)) {
      setSelectedTags([...selectedTags, customTag]);
      setCustomTag("");
    }
  }

  function removeTag(tag: string) {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  }

  async function handleUploadMeme(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fileUrl)
      return toast({
        title: "Meme upload failed",
        description: "No file uploaded",
        variant: "destructive",
      });
    if (memeName === "" || memeDescription === "")
      return toast({
        title: "Meme upload failed",
        description: "Meme name or description is empty",
        variant: "destructive",
      });
    if (selectedTags.length === 0)
      return toast({
        title: "Meme upload failed",
        description: "No tags selected",
        variant: "destructive",
      });

    if (success) {
      setLoading(true);
      const req = await fetch("/api/memes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memeName,
          memeDescription,
          memeTags: selectedTags,
          memeImageURL: fileUrl,
        }),
      });

      const resp = await req.json();

      if (req.status === 201) {
        setFileUrl(null);
        setMemeName("");
        setMemeDescription("");
        setSelectedTags([]);
        toast({
          title: "Meme uploaded successfully",
          description: resp.data.name + " has been uploaded",
        });
      } else {
        toast({
          title: "Meme upload failed",
          description: resp.error,
          variant: "destructive",
        });
      }
      setLoading(false);
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleUploadMeme}>
      <div className="grid gap-2">
        <Label htmlFor="meme-name">Meme Name</Label>
        <Input
          id="meme-name"
          type="text"
          placeholder="Rick Astley"
          onChange={(e) => setMemeName(e.target.value)}
          value={memeName}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="meme-tags">Meme Tags</Label>
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
        <Label htmlFor="meme-description">Meme Description</Label>
        <Textarea
          id="meme-description"
          className="min-h-[100px]"
          placeholder="Rick Astley is a British rock band."
          onChange={(e) => setMemeDescription(e.target.value)}
          value={memeDescription}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="meme-image">Meme Image</Label>
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
          </div>
        ) : (
          <UploadBtn setFileUrl={setFileUrl} setSuccess={setSuccess} />
        )}
      </div>
      <Button type="submit" className="mt-4" disabled={loading}>
        <CloudUpload className="mr-2" />
        {loading ? "Uploading..." : "Upload Meme"}
      </Button>
    </form>
  );
}
