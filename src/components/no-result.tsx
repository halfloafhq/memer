import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function NoResult() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-white font-bold text-2xl tracking-tight">
          No results found
        </h2>
        <Button asChild>
          <span className="flex items-center justify-center">
          <ChevronLeft className="h-5 w-5 mr-2" />
          <Link href="/?search=" className="font-bold">Back</Link>
          </span>
        </Button>
      </div>
    </div>
  );
}
