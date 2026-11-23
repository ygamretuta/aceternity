import { IconArrowUp, IconBrandGithub, IconBrandX } from "@tabler/icons-react";
import { FloatingDock } from "@/components/aceternity/floating-dock";
import type { WrappedData } from "../types";

const ICON_CLASS = "h-full w-full text-neutral-500 dark:text-neutral-300";

export function ShareDock({ data, shareUrl }: { data: WrappedData; shareUrl: string }) {
  const text = `I'm ${data.personality.title} — my ${data.year} on GitHub`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <FloatingDock
        items={[
          { title: "Share on X", href: tweetUrl, icon: <IconBrandX className={ICON_CLASS} /> },
          {
            title: "GitHub profile",
            href: data.profileUrl,
            icon: <IconBrandGithub className={ICON_CLASS} />,
          },
          { title: "Replay", href: "#top", icon: <IconArrowUp className={ICON_CLASS} /> },
        ]}
      />
    </div>
  );
}
