import type { BellConfig } from "./bellConfig";

export const BellType = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
} as const;

export type BellType = (typeof BellType)[keyof typeof BellType];
/** 残り時間から鳴らすべきベルを判定する */
export function getBellToRing(
  remainingSeconds: number,
  config: BellConfig,
): BellType | null {
  const elapsedSeconds = config.third - remainingSeconds;

  if (elapsedSeconds === config.third) return BellType.THIRD;
  if (elapsedSeconds === config.second) return BellType.SECOND;
  if (elapsedSeconds === config.first) return BellType.FIRST;

  return null;
}
