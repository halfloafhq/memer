'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Loader from '@/components/loader';
import { EditorData } from '@/types/collection';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState, BinaryFiles } from '@excalidraw/excalidraw/types/types';

const Excalidraw = dynamic(async () => (await import('@excalidraw/excalidraw')).Excalidraw, {
  ssr: false,
});

export default function EditorPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialData, setInitialData] = useState<EditorData | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('MEMER_EXCALIDRAW_EDITOR_DATA')) {
      localStorage.setItem('MEMER_EXCALIDRAW_EDITOR_DATA', JSON.stringify({}));
    }
    const data = JSON.parse(localStorage.getItem('MEMER_EXCALIDRAW_EDITOR_DATA') || '{}');
    if (data) {
      setInitialData({
        ...data,
        appState: { ...data.appState, collaborators: [] },
        scrollToContent: true,
      });
    } else {
      setInitialData(null);
    }
    setIsLoading(false);
  }, []);

  const onChange = (
    excalidrawElements: readonly ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles
  ) => {
    const data: EditorData = {
      elements: excalidrawElements,
      appState,
      files,
      scrollToContent: true,
    };
    localStorage.setItem('MEMER_EXCALIDRAW_EDITOR_DATA', JSON.stringify(data));
  };

  return (
    <div className="flex flex-col h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <Excalidraw onChange={onChange} initialData={initialData} />
      )}
    </div>
  );
}
