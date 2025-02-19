'use client';
import MemeEditForm from './_components/meme-edit-form';

export default function EditMemePage() {
  //get data here
  return (
    <main className="container flex flex-1 flex-col gap-4 px-4 py-8 md:gap-8">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Edit Meme</h1>
      </div>
      <div className="border shadow-sm rounded-lg p-6">
        <MemeEditForm />
      </div>
    </main>
  );
}
