"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import { getTotalMemes } from "@/app/_actions";

export function TotalMemes() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getTotalMemes().then((res) => {
      setTotal(res);
    });
  }, []);
  return (
    <Card className="w-full max-w-sm mx-auto mt-8">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <ImageIcon className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Total Memes
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {total}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
