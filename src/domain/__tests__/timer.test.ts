import { describe, it, expect } from 'vitest';
import { tick, start, pause, reset } from '../timer';
import { TimerStatus } from '../timerStatus';

describe('Timer Domain Logic', () => {
  // --- 正常系 ---
  it('tick: 実行中なら1秒減ること', () => {
    const timer = { remainingSeconds: 60, timerStatus: TimerStatus.RUNNING, progress: 0 };
    const result = tick(timer);
    expect(result.remainingSeconds).toBe(59);
  });

  it('start: READY状態からRUNNING状態に遷移すること', () => {
    const timer = reset(60);
    const result = start(timer);
    expect(result.timerStatus).toBe(TimerStatus.RUNNING);
  });

  it('pause: RUNNING状態からPAUSED状態に遷移すること', () => {
    const timer = { remainingSeconds: 60, timerStatus: TimerStatus.RUNNING, progress: 0 };
    const result = pause(timer);
    expect(result.timerStatus).toBe(TimerStatus.PAUSED);
  });

  // --- 異常系 ---
  it('tick: 停止中(PAUSED)なら秒数が減らないこと', () => {
    const timer = { remainingSeconds: 60, timerStatus: TimerStatus.PAUSED, progress: 0 };
    const result = tick(timer);
    expect(result.remainingSeconds).toBe(60);
  });

  it('start: 残り0秒のタイマーは開始できないこと', () => {
    const timer = { remainingSeconds: 0, timerStatus: TimerStatus.READY, progress: 0 };
    const result = start(timer);
    expect(result.timerStatus).toBe(TimerStatus.READY);
  });

  // --- 境界値 ---
  it('tick: 残り1秒から0秒になったらステータスがFINISHEDになること', () => {
    const timer = { remainingSeconds: 1, timerStatus: TimerStatus.RUNNING, progress: 0 };
    const result = tick(timer);
    expect(result.remainingSeconds).toBe(0);
    expect(result.timerStatus).toBe(TimerStatus.FINISHED);
  });

  it('tick: 0秒(FINISHED)の状態でtickしてもマイナスにならないこと', () => {
    const timer = { remainingSeconds: 0, timerStatus: TimerStatus.FINISHED, progress: 0 };
    const result = tick(timer);
    expect(result.remainingSeconds).toBe(0);
  });
});
