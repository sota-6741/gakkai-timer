import { formatMMSS } from "../utils/time";
import { cn } from "../utils/cn";

interface TimerDisplayProps {
  timeRemaining: number;
}

export function TimerDisplay({ timeRemaining }: TimerDisplayProps) {
  const isOvertime = timeRemaining < 0;
  const { mm, ss } = formatMMSS(timeRemaining);

  return (
    <div className={cn("transition-colors", isOvertime ? "text-red-500" : "text-white")}>
      <div 
        className="font-mono tabular-nums relative inline-block leading-none font-bold tracking-tighter"
        style={{ fontSize: 'var(--timer-font-size)' } as React.CSSProperties}
      >
        {isOvertime && (
          <span
            aria-hidden="true"
            className="absolute right-[100%] mr-[0.02em]"
          >
            −
          </span>
        )}
        <span>{mm}:{ss}</span>
      </div>
    </div>
  );
}
