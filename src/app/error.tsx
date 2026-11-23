"use client";

import { useEffect } from "react";
import { captureError } from "@/adapters/monitoring";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    captureError(error, { area: "app", action: "render" });
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-4 px-6">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted">We have been notified. Please try again.</p>
      <button
        onClick={reset}
        className="w-fit rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        Try again
      </button>
    </main>
  );
}
