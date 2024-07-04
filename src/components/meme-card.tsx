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
import { Meme } from "./meme";
import Image from "next/image";
import { Button } from "./ui/button";
import { FileDown } from "lucide-react";
import { useToast } from "./ui/use-toast";

type MemeCardProps = {
  src: string;
  name: string;
  description: string;
};

export function MemeCard({ src, name, description }: MemeCardProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}.jpg`; // Assumes PNG format, adjust if needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      toast({
        title: "Downloaded!",
        description: `${name} has been downloaded.`,
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        title: "Download Failed",
        description:
          "There was an error downloading the image. Please try again.",
        variant: "destructive",
      });
    }
  };
  return (
    <Sheet>
      <SheetTrigger>
        <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-2">
          <Meme src={src} name={name} description={description} />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{name}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-center mt-4 gap-4">
          <Image
            src={src}
            alt="Asset 1"
            width={400}
            height={300}
            className="object-contain w-full h-60"
          />
          <Button onClick={handleDownload}>
            <FileDown className="mr-2" />
            { loading ? "Downloading..." : "Download" }
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
