"use client";

import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { githubLoginSchema } from "../schema";

export function useUsernameForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setError(null);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = githubLoginSchema.safeParse(username);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    router.push(`/u/${result.data}`);
  };

  return { error, onChange, onSubmit };
}
