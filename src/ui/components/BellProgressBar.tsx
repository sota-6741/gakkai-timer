import { Bell } from "lucide-react";

interface BellProgressBarProps {
  totalTime: number;
  currentTime: number;
  bell1Time: number;
  bell2Time: number;
  bell3Time: number;
}

interface BellMarkerProps {
  position: number;
  label: string;
}

function BellMarker({ position, label }: BellMarkerProps) {
  return (
    <div
      className="absolute top-0 flex flex-col items-center"
      style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
    >
      <Bell size={18} className="text-yellow-500 fill-yellow-500" />
      <div
        className="mt-1 text-yellow-500/90 font-mono font-semibold text-[10px] tracking-widest uppercase"
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
  bell2Time,
  bell3Time,
}: BellProgressBarProps) {
  const elapsed = Math.max(0, totalTime - currentTime);
  const progressPercent = Math.min(100, (elapsed / totalTime) * 100);

  const bells = [
    { time: bell1Time, label: '1st' },
    { time: bell2Time, label: '2nd' },
    { time: bell3Time, label: '3rd' },
  ];

  return (
    <div className="w-full max-w-5xl">
      <div className="relative h-12 mb-4">
        {bells.map((bell) => (
          <BellMarker
            key={bell.label}
            position={(bell.time / totalTime) * 100}
            label={bell.label}
          />
        ))}
      </div>

      <div className="h-2 bg-gray-700/60 rounded-full overflow-hidden relative">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
        {bells.map((bell) => (
          <div
            key={bell.label}
            className="absolute top-0 bottom-0 w-px bg-yellow-500"
            style={{ left: `${(bell.time / totalTime) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
