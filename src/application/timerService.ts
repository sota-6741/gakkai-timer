import type { Timer } from '../domain/timer';
import type { BellConfig } from '../domain/bellConfig';
import type { BellCount } from '../domain/bell';
import * as TimerDomain from '../domain/timer';
import * as BellDomain from '../domain/bell';

export interface TickResult {
  readonly nextTimer: Timer;
  readonly bellToRing: BellCount | null;
  readonly progress: number;
}

/**
 * 1秒ごとの更新処理を統合する（Application Service）
 */
export function handleTick(currentTimer: Timer, config: BellConfig): TickResult {
  const nextTimer = TimerDomain.tick(currentTimer);
  const bellToRing = BellDomain.getBellToRing(nextTimer.remainingSeconds, config);
  
  // プログレス計算: (全時間 - 残り時間) / 全時間
  const progress = (config.third - nextTimer.remainingSeconds) / config.third;

  return {
    nextTimer,
    bellToRing,
    progress: Math.max(0, Math.min(1, progress)),
  };
}
