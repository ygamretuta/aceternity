import type { ErrorEvent } from "@sentry/nextjs";
import { describe, expect, it } from "vitest";
import { scrubEvent } from "./monitoring-config";

function buildEvent(overrides: Partial<ErrorEvent>): ErrorEvent {
  return { type: undefined, ...overrides } as ErrorEvent;
}

describe("scrubEvent", () => {
  it("keeps only the internal user id", () => {
    const event = buildEvent({ user: { id: "u1", email: "a@b.com", username: "ann" } });
    expect(scrubEvent(event).user).toEqual({ id: "u1" });
  });

  it("redacts credentials in request headers and drops cookies", () => {
    const event = buildEvent({
      request: { headers: { Authorization: "Bearer x", Accept: "text/html" }, cookies: { s: "1" } },
    });
    const { request } = scrubEvent(event);
    expect(request?.headers).toEqual({ Authorization: "[redacted]", Accept: "text/html" });
    expect(request?.cookies).toBeUndefined();
  });
});
