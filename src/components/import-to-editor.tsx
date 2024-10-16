"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { BinaryFileData, DataURL } from "@excalidraw/excalidraw/types/types";
import { useToast } from "./ui/use-toast";
import { EditorData } from "@/types/collection";
import { useRouter } from "next/navigation";
import { generateIdFromFile } from "@/utils/fileId";
import { ExcalidrawImageElement } from "@excalidraw/excalidraw/types/element/types";
import { useUser } from "@clerk/nextjs";

interface ImportToEditorProps {
  src: string;
}

export default function ImportToEditor({ src }: ImportToEditorProps) {
  const { toast } = useToast();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [initialData, setInitialData] = useState<EditorData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleImport() {
    if (!isSignedIn) {
      toast({
        title: "Not logged in!",
        description: "To use the import to editor functionality, you need to be logged in.",
        variant: "info",
      });
      return;
    }

    if (!initialData) {
      console.log("NO INITIAL DATA, THROWING ERROR")
      toast({
        title: "Import Failed",
        description: "There was an error importing the meme. Please try again.",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsLoading(true);

      // Fetch the file from the URL
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const contentType = response.headers.get("Content-Type") || "image/png";

      // Create a File object
      const fileName = src.split("/").pop() || "image";
      const file = new File([blob], fileName, { type: contentType });

      const fileId = await generateIdFromFile(file);

      // Create a data URL from the file
      const memeDataURL = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      // Load image to get dimensions
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = memeDataURL;
      });

      const binaryFileData: BinaryFileData = {
        mimeType: contentType as
          | "image/png"
          | "image/jpeg"
          | "image/webp"
          | "image/svg+xml"
          | "image/gif",
        id: fileId,
        dataURL: memeDataURL as DataURL,
        created: Date.now(),
        lastRetrieved: Date.now(),
      };

      const imageElement: ExcalidrawImageElement = {
        type: "image",
        version: 2,
        versionNonce: 0,
        isDeleted: false,
        id: fileId,
        fillStyle: "hachure",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        angle: 0,
        x: 0,
        y: 0,
        strokeColor: "transparent",
        backgroundColor: "transparent",
        width: img.naturalWidth,
        height: img.naturalHeight,
        seed: Math.floor(Math.random() * 2 ** 31),
        groupIds: [],
        frameId: null,
        roundness: null,
        boundElements: null,
        updated: Date.now(),
        link: null,
        locked: false,
        fileId: fileId,
        scale: [1, 1],
        status: "saved",
      };

      const { elements, appState } = initialData;
      const updatedData: EditorData = {
        elements: [...elements, imageElement],
        appState,
        files: { [fileId]: binaryFileData },
        scrollToContent: true,
      };

      localStorage.setItem(
        "MEMER_EXCALIDRAW_EDITOR_DATA",
        JSON.stringify(updatedData),
      );
      router.push(`/dashboard/editor`);

      toast({
        title: "Imported!",
        description: "Meme was imported to editor.",
      });
    } catch (error) {
      console.error("Import failed:", error);
      toast({
        title: "Import Failed",
        description: "There was an error importing the meme. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("MEMER_EXCALIDRAW_EDITOR_DATA")) {
      localStorage.setItem("MEMER_EXCALIDRAW_EDITOR_DATA", JSON.stringify({}));
    }
    const data = JSON.parse(
      localStorage.getItem("MEMER_EXCALIDRAW_EDITOR_DATA") || "{}",
    );
    if (data) {
      setInitialData({
        ...data,
        appState: { ...data.appState, collaborators: [] },
        scrollToContent: true,
      });
    } else {
      setInitialData(null);
    }
  }, []);

  return (
    <div className="w-full flex items-center gap-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={handleImport}
        disabled={isLoading}
      >
        <Pencil className="h-5 w-5 mr-2" />
        {isLoading && "Importing..."}
        {!isLoading && "Import to Editor"}
      </Button>
    </div>
  );
}
