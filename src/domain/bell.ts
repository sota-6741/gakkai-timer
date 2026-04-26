import type { BellConfig } from './bellConfig';

export type BellCount = 1 | 2 | 3;

/** 残り時間から鳴らすべきベルを判定する */
export function getBellToRing(remainingSeconds: number, config: BellConfig): BellCount | null {
  const elapsedSeconds = config.third - remainingSeconds;

  if (elapsedSeconds === config.third) return 3;
  if (elapsedSeconds === config.second) return 2;
  if (elapsedSeconds === config.first) return 1;

  return null;
}
