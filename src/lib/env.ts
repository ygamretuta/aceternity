/** Reads a required environment variable and fails loudly when it is missing. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const isProduction = process.env.NODE_ENV === "production";
