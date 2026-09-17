"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Router Error:", error);
  }, [error]);

  return (
    <div className="w-full min-h-screen bg-ink text-bone font-mono flex flex-col items-center justify-center p-6 select-none">
      <div className="max-w-md w-full border-4 border-bone bg-ink p-6 shadow-[8px_8px_0px_rgb(var(--accent))]">
        <h2 className="text-xl font-bold uppercase mb-4 text-accent-light">
          SYSTEM NOTICE // RENDER ERROR
        </h2>
        <p className="text-xs text-bone/80 mb-6 leading-relaxed">
          {error?.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={() => reset()}
          className="w-full py-3 bg-bone text-ink font-bold text-xs uppercase border-2 border-bone hover:bg-accent hover:text-bone transition-colors"
        >
          RETRY RENDERING
        </button>
      </div>
    </div>
  );
}
