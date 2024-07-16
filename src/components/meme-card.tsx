"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Meme from "./meme";
import Image from "next/image";
import SaveMeme from "./save-meme";
import { Button } from "./ui/button";
import { FileDown } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { downloadMeme } from "@/utils/download";

type MemeCardProps = {
  memeId: string;
  src: string;
  name: string;
  description: string;
};

export default function MemeCard({
  src,
  name,
  description,
  memeId,
}: MemeCardProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const success = await downloadMeme(src, name);
      if (!success) {
        toast({
          title: "Download Failed",
          description:
            "There was an error downloading the image. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Downloaded!",
          description: `${name} has been downloaded.`,
        });
      }
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        title: "Download Failed",
        description:
          "There was an error downloading the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Sheet>
      <SheetTrigger className="w-full sm:w-auto">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-gray-600 duration-300 ">
          <Meme src={src} name={name} />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl sm:text-2xl">{name}</SheetTitle>
          <SheetDescription className="text-left text-sm sm:text-base">
            {description}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-center mt-4 gap-4">
          <Image
            src={src}
            alt="Asset 1"
            width={400}
            height={400}
            objectFit="contain"
            className="object-contain w-full"
          />
          <Button onClick={handleDownload} className="w-full sm:w-auto">
            <FileDown className="mr-2" />
            {loading ? "Downloading..." : "Download"}
          </Button>
          <SaveMeme src={src} name={name} memeId={memeId} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
