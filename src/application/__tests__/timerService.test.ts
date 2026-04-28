/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTimerActions } from '../timerService';
import { TimerStatus } from '../../domain/timerStatus';
import * as storageAdapter from '../../service/storageAdapter';
import * as audioAdapter from '../../service/audioAdapter';

// Service(Adapter)層をモック化する
vi.mock('../../service/storageAdapter');
vi.mock('../../service/audioAdapter');

describe('Timer UseCase (Application Layer)', () => {
  // モックの準備
  const mockUpdateTimer = vi.fn();
  const mockPlay = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // useTimerStorage の戻り値を設定
    (storageAdapter.useTimerStorage as any).mockReturnValue({
      timer: { remainingSeconds: 60, timerStatus: TimerStatus.READY, progress: 0 },
      updateTimer: mockUpdateTimer,
    });

    // useBellConfigStorage の戻り値を設定
    (storageAdapter.useBellConfigStorage as any).mockReturnValue({
      bellConfig: { first: 480, second: 600, third: 900 },
    });

    // useBellPlayer の戻り値を設定
    (audioAdapter.useBellPlayer as any).mockReturnValue({
      play: mockPlay,
    });
  });

  it('startTimer: updateTimerがRUNNING状態で呼び出されること', () => {
    const { result } = renderHook(() => useTimerActions());
    result.current.startTimer();

    expect(mockUpdateTimer).toHaveBeenCalledWith(
      expect.objectContaining({ timerStatus: TimerStatus.RUNNING })
    );
  });

  it('tickTimer: 1秒経過し、更新された状態が保存されること', () => {
    // 実行中の状態をセット
    (storageAdapter.useTimerStorage as any).mockReturnValue({
      timer: { remainingSeconds: 60, timerStatus: TimerStatus.RUNNING, progress: 0 },
      updateTimer: mockUpdateTimer,
    });

    const { result } = renderHook(() => useTimerActions());
    result.current.tickTimer();

    expect(mockUpdateTimer).toHaveBeenCalledWith(
      expect.objectContaining({ remainingSeconds: 59 })
    );
  });

  it('tickTimer: ベルを鳴らすタイミング（0秒）で player.play が呼ばれること', () => {
    // 残り1秒の状態をセット
    (storageAdapter.useTimerStorage as any).mockReturnValue({
      timer: { remainingSeconds: 1, timerStatus: TimerStatus.RUNNING, progress: 0.99 },
      updateTimer: mockUpdateTimer,
    });

    const { result } = renderHook(() => useTimerActions());
    result.current.tickTimer();

    // 0秒になるので終鈴（THIRD=3）が鳴るはず
    expect(mockPlay).toHaveBeenCalledWith(3);
  });
});
