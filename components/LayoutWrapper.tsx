"use client";

import { PreloaderProvider } from "@/context/PreloaderContext";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <PreloaderProvider>
      <Preloader />
      <CustomCursor />
      <div className="relative w-full min-h-screen">{children}</div>
    </PreloaderProvider>
  );
}
