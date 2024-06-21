"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useToast } from "@/components/ui/use-toast";
import { Collection } from "@prisma/client";

type DashboardContextType = {
  collections: Collection[],
  refreshCollections: () => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a InvitationProvider",
    );
  }
  return context;
};

type DashboardProviderProps = {
  children: ReactNode;
};

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const { toast } = useToast();

  const refreshCollections = async () => {
    try {
      const req = await fetch("/api/collection/all");
      const res = await req.json();
      if (req.status === 200) {
        setCollections(res.data);
      }
    } catch (err: any) {
      return toast({
        title: "Uh oh! Couldn't fetch collections",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    refreshCollections();
  }, []);

  return (
    <DashboardContext.Provider value={{ collections, refreshCollections }}>
      {children}
    </DashboardContext.Provider>
  );
};
