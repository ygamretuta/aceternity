import Link from "next/link";

export function RateLimitMessage() {
  return (
    <div className="dark flex min-h-screen flex-col items-center justify-center gap-4 bg-stage px-6 text-center text-stage-foreground">
      <h1 className="text-3xl font-bold">GitHub needs a breather</h1>
      <p className="text-stage-muted">
        We hit GitHub&apos;s rate limit. Please try again in a few minutes.
      </p>
      <Link href="/" className="text-accent underline-offset-4 hover:underline">
        Back home
      </Link>
    </div>
  );
}
