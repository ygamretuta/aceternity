import { cacheLife } from "next/cache";
import { fetchYearActivity } from "@/adapters/github";
import { buildWrapped } from "./build-wrapped";
import type { WrappedData } from "../types";

/** Loads and shapes one user's year. Cached per user and year so shares don't hit GitHub each time. */
export async function getWrapped(login: string, year: number): Promise<WrappedData> {
  "use cache";
  cacheLife("hours");
  return buildWrapped(await fetchYearActivity(login, year), year);
}
