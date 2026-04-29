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
      <div className="font-mono tabular-nums relative inline-block text-[8rem] sm:text-[14rem] md:text-[20rem] landscape:text-[6rem] sm:landscape:text-[20rem] landscape:sm:text-[12rem] landscape:md:text-[16rem] landscape:lg:text-[20rem] leading-none font-bold tracking-tighter">
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
