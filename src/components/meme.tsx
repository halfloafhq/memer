import Image from "next/image";
import React from "react";

type MemeProps = {
  src: string;
  name: string;
};

export default function Meme({ src, name }: MemeProps) {
  return (
    <div className="w-full h-full group overflow-hidden rounded-lg flex flex-col justify-center items-center">
      <div className="relative aspect-square h-[300px] w-full overflow-hidden rounded-lg">
        <Image
          src={src}
          alt="Meme"
          fill
          className="object-contain group-hover:opacity-40 transition-opacity"
        />
      </div>
      <div className="bg-white p-4 dark:bg-gray-950">
        <h3 className="font-semibold text-lg md:text-xl truncate">{name}</h3>
      </div>
    </div>
  );
}
