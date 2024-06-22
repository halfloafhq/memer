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
import { useLoadingCtx } from "./LoadingContext";

type DashboardContextType = {
  collections: Collection[],
  refreshCollections: () => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export const useDashboardCtx = () => {
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
  const { setLoading } = useLoadingCtx();
  const { toast } = useToast();

  const firstFetch = async () => {
    setLoading(true);
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
    } finally {
    setLoading(false);
    }
  };

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
    firstFetch();
  }, []);

  return (
    <DashboardContext.Provider value={{ collections, refreshCollections }}>
      {children}
    </DashboardContext.Provider>
  );
};
