export const TimerStatus = {
  READY: 'READY',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  FINISHED: 'FINISHED',
} as const;

export type TimerStatus = (typeof TimerStatus)[keyof typeof TimerStatus];
