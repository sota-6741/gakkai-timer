import { TimerStatus } from "./timerStatus";

/**
 * Timer Domain Model
 * 
 * remainingSeconds: 残り秒数
 * timerStatus: 現在のステータス
 * progress: 進捗率 (0.0 〜 1.0)
 */
export interface Timer {
  readonly remainingSeconds: number;
  readonly timerStatus: TimerStatus;
  readonly progress: number;
}

/** タイマースタート **/
export function start(timer: Timer): Timer {
  if (timer.timerStatus === TimerStatus.RUNNING || timer.remainingSeconds <= 0) {
    return timer;
  }

  return {
    ...timer,
    timerStatus: TimerStatus.RUNNING,
  };
}

/** タイマーポーズ **/
export function pause(timer: Timer): Timer {
  if (timer.timerStatus !== TimerStatus.RUNNING) {
    return timer;
  }

  return {
    ...timer,
    timerStatus: TimerStatus.PAUSED,
  };
}

/** 1秒経過させる (計算ロジックのみ) **/
export function tick(timer: Timer): Timer {
  if (timer.timerStatus !== TimerStatus.RUNNING || timer.remainingSeconds <= 0) {
    return timer;
  }

  const nextSeconds = timer.remainingSeconds - 1;
  const nextStatus = nextSeconds === 0 ? TimerStatus.FINISHED : timer.timerStatus;

  return {
    ...timer,
    remainingSeconds: nextSeconds,
    timerStatus: nextStatus,
  };
}

/** タイマーリセット **/
export function reset(initialSeconds: number): Timer {
  return {
    remainingSeconds: initialSeconds,
    timerStatus: TimerStatus.READY,
    progress: 0, // 開始時は 0%
  };
}
