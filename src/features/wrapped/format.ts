const numberFormat = new Intl.NumberFormat("en-US");
const monthFormat = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" });
const shortMonthFormat = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

export const formatNumber = (value: number) => numberFormat.format(value);
export const formatPercent = (fraction: number) => `${Math.round(fraction * 100)}%`;
export const monthName = (month: number) => monthFormat.format(new Date(Date.UTC(2000, month, 1)));
export const shortMonthName = (month: number) =>
  shortMonthFormat.format(new Date(Date.UTC(2000, month, 1)));

/** "up 23% from 2025", "down 10% from 2025", or null when there is nothing to compare. */
export function describeYearChange(current: number, previous: number, previousYear: number) {
  if (previous === 0) return null;
  const change = Math.round(((current - previous) / previous) * 100);
  if (change === 0) return `the same as ${previousYear}`;
  return `${change > 0 ? "up" : "down"} ${Math.abs(change)}% from ${previousYear}`;
}
