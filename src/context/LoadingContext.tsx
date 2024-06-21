"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type LoadingContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoadingCtx = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
};

type LoadingProviderProps = {
  children: ReactNode;
};

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
