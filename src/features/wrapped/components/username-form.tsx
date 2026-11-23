"use client";

import { PlaceholdersAndVanishInput } from "@/components/aceternity/placeholders-and-vanish-input";
import { useUsernameForm } from "../hooks/use-username-form";

const PLACEHOLDERS = ["torvalds", "gaearon", "sindresorhus", "tj", "your-github-username"];

export function UsernameForm() {
  const { error, onChange, onSubmit } = useUsernameForm();

  return (
    <div className="w-full max-w-xl">
      <PlaceholdersAndVanishInput
        placeholders={PLACEHOLDERS}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      {error && (
        <p role="alert" className="mt-3 text-center text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
