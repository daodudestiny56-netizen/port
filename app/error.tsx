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
    <div className="w-full min-h-screen bg-[#0D0D0D] text-[#FFFFFF] font-mono flex flex-col items-center justify-center p-6 select-none">
      <div className="max-w-md w-full border-4 border-[#FFFFFF] bg-[#0D0D0D] p-6 shadow-[8px_8px_0px_#2B4EFF]">
        <h2 className="text-xl font-bold uppercase mb-4 text-[#2B4EFF]">
          SYSTEM NOTICE // RENDER ERROR
        </h2>
        <p className="text-xs text-[#FFFFFF]/80 mb-6 leading-relaxed">
          {error?.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={() => reset()}
          className="w-full py-3 bg-[#FFFFFF] text-[#0D0D0D] font-bold text-xs uppercase border-2 border-[#FFFFFF] hover:bg-[#2B4EFF] hover:text-[#FFFFFF] transition-colors"
        >
          RETRY RENDERING
        </button>
      </div>
    </div>
  );
}
