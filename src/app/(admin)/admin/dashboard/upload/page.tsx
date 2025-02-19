'use client';
import MemeUploadForm from '@/components/memes/meme-upload-form';
import { TotalMemes } from '@/components/memes/total-memes';
import { useState } from 'react';

export default function AdminDashboardUploadPage() {
  const [render, setRender] = useState<Date>(new Date());
  return (
    <main className="container flex flex-1 flex-col gap-4 px-4 py-8 md:gap-8">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Upload Meme</h1>
        <TotalMemes render={render} />
      </div>
      <div className="border shadow-sm rounded-lg p-6">
        <MemeUploadForm setRender={setRender} />
      </div>
    </main>
  );
}
