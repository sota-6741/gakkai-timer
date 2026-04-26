/**
 * Timerの進捗を表す
 */
export type Progress = number;

export function createProgress(current: number, total: number): Progress {
  if (total <= 0) return 0;
  const rawProgress = current / total;
  return Math.max(0, Math.min(1, rawProgress));
}
