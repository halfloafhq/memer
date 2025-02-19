import React from 'react';

interface CollectionCardProps {
  name: string;
  onClick: () => void;
}

export function CollectionCard({ name, onClick }: CollectionCardProps) {
  return (
    <div
      className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md dark:shadow-sm dark:hover:shadow-md dark:hover:shadow-gray-500 transition-shadow duration-300 ease-in-out cursor-pointer dark:bg-background"
      onClick={() => onClick()}
    >
      <p className="text-2xl font-semibold text-gray-800 text-center dark:text-white">{name}</p>
    </div>
  );
}
