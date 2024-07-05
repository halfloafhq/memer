"use client";
import MemeUploadForm from "./_components/meme-upload-form";

export default function AdminDashboardUploadPage() {
  return (
    <main className="container flex flex-1 flex-col gap-4 px-4 py-8 md:gap-8">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Upload Meme</h1>
      </div>
      <div className="border shadow-sm rounded-lg p-6">
        <MemeUploadForm />
      </div>
    </main>
  );
}
