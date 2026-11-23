import { formatNumber, monthName, shortMonthName } from "../format";
import type { WrappedData } from "../types";
import { GrowBar } from "./grow-bar";
import { Reveal } from "./reveal";
import { StorySection } from "./story-section";

export function TimelineSection({ data }: { data: WrappedData }) {
  const peak = data.busiestMonth.contributions || 1;

  return (
    <StorySection>
      <Reveal className="flex w-full max-w-3xl flex-col items-center gap-12">
        <h2 className="text-3xl font-bold md:text-5xl">
          <span className="text-accent">{monthName(data.busiestMonth.month)}</span> was your month
        </h2>
        <ol className="flex h-56 w-full items-end gap-2" aria-label="Contributions per month">
          {data.months.map((month) => (
            <li key={month.month} className="flex h-full flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end">
                <GrowBar
                  fraction={month.contributions / peak}
                  orientation="vertical"
                  className={
                    month.month === data.busiestMonth.month ? "w-full" : "w-full opacity-40"
                  }
                />
              </div>
              <span className="text-xs text-stage-muted">{shortMonthName(month.month)}</span>
            </li>
          ))}
        </ol>
        <p className="text-stage-muted">
          {formatNumber(data.busiestMonth.contributions)} contributions that month. Your longest
          streak was {formatNumber(data.longestStreak)} days in a row.
        </p>
      </Reveal>
    </StorySection>
  );
}
