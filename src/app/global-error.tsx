"use client";

import { useEffect } from "react";
import { captureError } from "@/adapters/monitoring";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    captureError(error, { area: "app", action: "global-render" });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
          <h1>Something went wrong</h1>
          <p>We have been notified. Please reload the page.</p>
        </main>
      </body>
    </html>
  );
}
