import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StorySection({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-6 py-24 text-center",
        className,
      )}
    >
      {children}
    </section>
  );
}
