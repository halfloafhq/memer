import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Meme } from "./meme";

type MemeCardProps = {
  src: string;
  name: string;
  description: string;
};

export function MemeCard({ src, name, description }: MemeCardProps) {
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
      </SheetContent>
    </Sheet>
  );
}
