"use client";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="relative w-full min-h-screen">
      {children}
    </div>
  );
}
