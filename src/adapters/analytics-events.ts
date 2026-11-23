/** Every analytics event the app can send. Add new events here, in business terms. */
export const ANALYTICS_EVENTS = {
  SIGNED_UP: "signed_up",
} as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
