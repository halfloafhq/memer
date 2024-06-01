import Image from "next/image";
import React from "react";

type MemeProps = {
  src: string;
  name: string;
  description: string;
};

export default function Meme({ src, name, description }: MemeProps) {
  return (
    <div className="relative group overflow-hidden rounded-lg">
      <Image
        src={src}
        alt="Asset 1"
        width={400}
        height={300}
        className="object-contain w-full h-60 group-hover:opacity-40 transition-opacity"
      />
      <div className="bg-white p-4 dark:bg-gray-950">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}
