"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import { getTotalMemes } from "@/app/_actions";
import { Spinner } from "./spinner";
import { useToast } from "./ui/use-toast";

interface TotalMemesProps {
  render: Date;
}

export function TotalMemes({ render }: TotalMemesProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    try {
      getTotalMemes().then((res) => {
        setTotal(res);
        setLoading(false);
      });
    } catch (error) {
      setTotal(0);
      toast({
        title: "Error",
        description: "Failed to fetch total memes",
        variant: "destructive",
      });
    }
  }, [toast, render]);

  return (
    <Card className="w-full max-w-sm mx-auto mt-8">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <ImageIcon className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Total Memes
            </p>
            {loading ? (
              <div className="flex items-center justify-start">
                <Spinner />
              </div>
            ) : (
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {total}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
