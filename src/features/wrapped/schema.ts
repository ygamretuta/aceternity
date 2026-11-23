import { z } from "zod";

const GITHUB_LOGIN_PATTERN = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export const githubLoginSchema = z
  .string()
  .trim()
  .regex(GITHUB_LOGIN_PATTERN, "Enter a valid GitHub username");
