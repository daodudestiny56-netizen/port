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
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-page p-6">
      <div className="panel w-full max-w-md rounded-xl p-6">
        <p className="text-xs text-muted">~/error.log</p>
        <h2 className="mt-3 text-lg text-fg">Something failed to render.</h2>
        <p className="mt-3 text-xs leading-relaxed text-dim">
          {error?.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm text-accent transition-colors hover:bg-accent/20"
        >
          try again
        </button>
      </div>
    </div>
  );
}
