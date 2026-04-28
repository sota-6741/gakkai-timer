import { type ChangeEvent } from "react";
import { splitMinutesSeconds } from "../utils/time";

interface TimeInputProps {
  label: string;
  value: number;
  onChange: (seconds: number) => void;
  onBlur?: () => void;
}

const FIELD_CLASS =
  'w-16 px-2 py-2.5 bg-white border border-gray-300 rounded-md focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 focus:outline-none text-center font-mono text-base transition-colors text-black';

export function TimeInput({ label, value, onChange, onBlur }: TimeInputProps) {
  const { minutes, seconds } = splitMinutesSeconds(value);

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    onChange(val * 60 + seconds);
  };

  const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    onChange(minutes * 60 + val);
  };

  return (
    <div>
      <label
        className="text-xs text-gray-700 mb-2 block font-medium tracking-wider"
      >
        {label}
      </label>
      <div className="flex gap-1.5 items-center">
        <input
          type="number"
          value={String(minutes).padStart(2, '0')}
          onChange={handleMinutesChange}
          onBlur={onBlur}
          className={FIELD_CLASS}
          min="0"
          max="99"
        />
        <span className="text-gray-400 font-mono text-base">:</span>
        <input
          type="number"
          value={String(seconds).padStart(2, '0')}
          onChange={handleSecondsChange}
          onBlur={onBlur}
          className={FIELD_CLASS}
          min="0"
          max="59"
        />
      </div>
    </div>
  );
}
