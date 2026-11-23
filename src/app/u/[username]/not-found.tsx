import Link from "next/link";

export default function UserNotFound() {
  return (
    <div className="dark flex min-h-screen flex-col items-center justify-center gap-4 bg-stage px-6 text-center text-stage-foreground">
      <h1 className="text-3xl font-bold">We couldn&apos;t find that GitHub user</h1>
      <p className="text-stage-muted">Check the spelling and try again.</p>
      <Link href="/" className="text-accent underline-offset-4 hover:underline">
        Try another username
      </Link>
    </div>
  );
}
