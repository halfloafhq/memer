"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Loader from "../_components/Loader";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);
export default function EditorPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <Excalidraw />
      )}
    </div>
  );
}
