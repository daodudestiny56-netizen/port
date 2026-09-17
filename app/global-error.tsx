"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-ink text-bone font-mono flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-md w-full border-4 border-bone bg-ink p-6 shadow-[8px_8px_0px_rgb(var(--accent))]">
          <h2 className="text-xl font-bold uppercase mb-4 text-accent-light">
            SYSTEM NOTICE // RECOVERABLE ERROR
          </h2>
          <p className="text-xs text-bone/80 mb-6 leading-relaxed">
            {error?.message || "An unexpected error occurred during rendering."}
          </p>
          <button
            onClick={() => reset()}
            className="w-full py-3 bg-bone text-ink font-bold text-xs uppercase border-2 border-bone hover:bg-accent hover:text-bone transition-colors"
          >
            RESET SYSTEM & REFRESH
          </button>
        </div>
      </body>
    </html>
  );
}
