import { ImageResponse } from "next/og";
import { getWrapped } from "@/features/wrapped/server/get-wrapped";
import { getWrappedYear } from "@/features/wrapped/server/get-wrapped-year";
import { githubLoginSchema } from "@/features/wrapped/schema";
import { formatNumber } from "@/features/wrapped/format";
import type { WrappedData } from "@/features/wrapped/types";

export const alt = "A developer's year on GitHub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadData(username: string): Promise<WrappedData | null> {
  const parsed = githubLoginSchema.safeParse(username);
  if (!parsed.success) return null;
  try {
    return await getWrapped(parsed.data, await getWrappedYear());
  } catch {
    // The card falls back to a generic image; the page itself reports real errors.
    return null;
  }
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const data = await loadData((await params).username);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 24,
        padding: 80,
        background: "#0a0a0a",
        color: "#fafafa",
      }}
    >
      <div style={{ display: "flex", fontSize: 36, color: "#a3a3a3" }}>
        {data ? `@${data.login} · ${data.year} on GitHub` : "Developer Wrapped"}
      </div>
      <div style={{ display: "flex", fontSize: 96, fontWeight: 700, color: "#818cf8" }}>
        {data ? data.personality.title : "Your year in code"}
      </div>
      {data && (
        <div style={{ display: "flex", fontSize: 44 }}>
          {formatNumber(data.commits)} commits
          {data.languages[0] ? ` · mostly ${data.languages[0].name}` : ""}
        </div>
      )}
    </div>,
    size,
  );
}
