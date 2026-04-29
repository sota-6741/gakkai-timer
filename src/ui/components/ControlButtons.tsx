import { Play, Pause, RotateCcw, SkipForward, SkipBack } from "lucide-react";
import { cn } from "../utils/cn";

interface ControlButtonsProps {
  isRunning: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface IconButtonProps {
  icon: typeof Play;
  onClick: () => void;
  label: string;
  size?: number;
  primary?: boolean;
}

function IconButton({ icon: Icon, onClick, label, size = 32, primary = false }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-4 sm:p-3 landscape:p-2 transition-colors cursor-pointer outline-none",
        primary ? "text-white hover:text-gray-200" : "text-gray-500 hover:text-gray-300"
      )}
      aria-label={label}
    >
      <Icon 
        size={size} 
        className={cn(
          "landscape:w-6 landscape:h-6",
          primary ? "w-10 h-10 sm:w-10 sm:h-10" : "w-8 h-8 sm:w-8 sm:h-8"
        )} 
      />
    </button>
  );
}

export function ControlButtons({
  isRunning,
  onPlayPause,
  onReset,
  onNext,
  onPrevious,
}: ControlButtonsProps) {
  return (
    <div className="inline-flex gap-3 items-center justify-center">
      <IconButton icon={SkipBack} onClick={onPrevious} label="Previous speaker" />
      <IconButton
        icon={isRunning ? Pause : Play}
        onClick={onPlayPause}
        label={isRunning ? 'Pause' : 'Play'}
        size={40}
        primary
      />
      <IconButton icon={RotateCcw} onClick={onReset} label="Reset timer" />
      <IconButton icon={SkipForward} onClick={onNext} label="Next speaker" />
    </div>
  );
}
