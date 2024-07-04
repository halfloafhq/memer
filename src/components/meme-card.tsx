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
        <Meme src={src} name={name} description={description} />
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
