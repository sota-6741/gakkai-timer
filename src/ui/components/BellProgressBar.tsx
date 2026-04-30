import { Bell } from "lucide-react";

interface BellProgressBarProps {
  totalTime: number;
  currentTime: number;
  bell1Time: number;
  bell1Enabled: boolean;
  bell2Time: number;
  bell2Enabled: boolean;
  bell3Time: number;
  bell3Enabled: boolean;
}

interface BellMarkerProps {
  position: number;
  label: string;
  enabled: boolean;
}

function BellMarker({ position, label, enabled }: BellMarkerProps) {
  if (!enabled) return null;
  return (
    <div
      className="absolute top-0 flex flex-col items-center"
      style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
    >
      <Bell size={18} className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] landscape:w-3 sm:landscape:w-[18px] landscape:h-3 sm:landscape:h-[18px] text-yellow-500 fill-yellow-500" />
      <div
        className="mt-0.5 text-yellow-500/90 font-mono font-semibold text-[8px] sm:text-[10px] landscape:text-[6px] sm:landscape:text-[10px] tracking-widest uppercase"
      >
        {label}
      </div>
    </div>
  );
}

export function BellProgressBar({
  totalTime,
  currentTime,
  bell1Time,
  bell1Enabled,
  bell2Time,
  bell2Enabled,
  bell3Time,
  bell3Enabled,
}: BellProgressBarProps) {
  const elapsed = Math.max(0, totalTime - currentTime);
  const progressPercent = Math.min(100, (elapsed / totalTime) * 100);

  const bells = [
    { time: bell1Time, label: '1st', enabled: bell1Enabled },
    { time: bell2Time, label: '2nd', enabled: bell2Enabled },
    { time: bell3Time, label: '3rd', enabled: bell3Enabled },
  ];

  return (
    <div className="w-full max-w-5xl">
      <div className="relative h-12 mb-4 landscape:h-8 sm:landscape:h-12 landscape:mb-1 sm:landscape:mb-4">
        {bells.map((bell) => (
          <BellMarker
            key={bell.label}
            position={(bell.time / totalTime) * 100}
            label={bell.label}
            enabled={bell.enabled}
          />
        ))}
      </div>

      <div className="h-2 bg-gray-700/60 rounded-full overflow-hidden relative">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
        {bells.map((bell) => (
          bell.enabled && (
            <div
              key={bell.label}
              className="absolute top-0 bottom-0 w-px bg-yellow-500"
              style={{ left: `${(bell.time / totalTime) * 100}%` }}
            />
          )
        ))}
      </div>
    </div>
  );
}
