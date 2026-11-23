import { connection } from "next/server";

/** The year being wrapped: the current one. Read at request time so it never freezes into a prerender. */
export async function getWrappedYear(): Promise<number> {
  await connection();
  return new Date().getFullYear();
}
