"use client";

import React, { createContext, useContext, useState } from "react";

interface PreloaderContextType {
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isLoaded: true,
  setIsLoaded: () => {},
});

export const PreloaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <PreloaderContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => useContext(PreloaderContext);
