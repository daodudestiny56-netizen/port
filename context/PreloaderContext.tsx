"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface PreloaderContextType {
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isLoaded: false,
  setIsLoaded: () => {},
});

export const PreloaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(true);

  return (
    <PreloaderContext.Provider value={{ isLoaded, setIsLoaded: () => {} }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => useContext(PreloaderContext);
