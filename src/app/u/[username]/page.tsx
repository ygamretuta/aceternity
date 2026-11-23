import type { Metadata } from "next";
import { Suspense } from "react";
import { StoryLoader } from "@/features/wrapped/components/story-loader";
import { UserStory } from "@/features/wrapped/components/user-story";

export async function generateMetadata({ params }: PageProps<"/u/[username]">): Promise<Metadata> {
  const { username } = await params;
  return { title: `${username}'s year on GitHub` };
}

export default function UserPage({ params }: PageProps<"/u/[username]">) {
  return (
    <Suspense fallback={<StoryLoader />}>
      <UserStory params={params} />
    </Suspense>
  );
}
