"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Image from "next/image";
import { CloudUpload, X, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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

export default function AdminDashboardUploadPage() {
  const [meme, setMeme] = useState<File | null>(null);
  const [memeURL, setMemeURL] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState<string>("");

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setMemeURL(URL.createObjectURL(file));
    setMeme(file);
  }

  function removeMeme() {
    setMeme(null);
    setMemeURL("");
  }

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

  return (
    <main className="container flex flex-1 flex-col gap-4 px-4 py-8 md:gap-8">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Upload Meme</h1>
      </div>
      <div className="border shadow-sm rounded-lg p-6">
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="meme-name">Meme Name</Label>
            <Input id="meme-name" type="text" placeholder="Rick Astley" />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="meme-tags">Meme Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map(tag => (
                <div key={tag} className="bg-gray-200 px-2 py-1 rounded-full flex items-center">
                  <span>{tag}</span>
                  <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-gray-600 hover:text-gray-800">
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
                  {predefinedTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
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
          </div><div className="grid gap-2">
            <Label htmlFor="meme-description">Meme Description</Label>
            <Textarea
              id="meme-description"
              className="min-h-[100px]"
              placeholder="Rick Astley is a British rock band."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="meme-image">Meme Image</Label>
            {meme ? (
              <div className="flex flex-col items-center justify-center relative">
                <Image
                  width={300}
                  height={300}
                  src={memeURL}
                  layout="responsive"
                  alt="Meme Preview"
                  className="max-w-[720px] h-auto object-contain"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={removeMeme}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Label
                htmlFor="meme-image"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <Input
                  id="meme-image"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </Label>
            )}
          </div>
          <Button type="submit" className="mt-4">
            <CloudUpload className="mr-2" />
            Upload Meme
          </Button>
        </form>
      </div>
    </main>
  );
}
