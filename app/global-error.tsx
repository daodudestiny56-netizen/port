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
      <body style={{ backgroundColor: "#0D1110", color: "#E5EAE5", fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
          <div style={{ maxWidth: "28rem", width: "100%", border: "1px solid rgba(190,220,199,0.12)", borderRadius: 14, padding: "1.5rem" }}>
            <p style={{ fontSize: 12, color: "#647168", margin: 0 }}>~/error.log</p>
            <h2 style={{ fontSize: 18, fontWeight: 500, margin: "0.75rem 0 0" }}>The page could not be rendered.</h2>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: "#929D95", margin: "0.75rem 0 0" }}>
              {error?.message || "An unexpected error occurred during rendering."}
            </p>
            <button
              onClick={() => reset()}
              style={{
                marginTop: "1.5rem",
                borderRadius: 999,
                border: "1px solid rgba(163,230,178,0.4)",
                background: "rgba(163,230,178,0.1)",
                color: "#A3E6B2",
                padding: "0.625rem 1.25rem",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              reload
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
