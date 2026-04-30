import { tick, start, pause, reset } from "../domain/timer";
import { getBellToRing } from "../domain/bell";
import { createProgress } from "../domain/progress";
import { createBellConfig, getTotalDuration } from "../domain/bellConfig";
import {
  useTimerStorage,
  useBellConfigStorage,
} from "../service/storageAdapter";
import { useBellPlayer } from "../service/audioAdapter";
import type { TimerStorageService, BellConfigStorageService } from "./ports";
import type { BellConfig } from "../domain/bellConfig";

/**
 * 他のサービスから利用するための独立したリセット関数
 */
export function resetTimer(
  timerStorage: TimerStorageService,
  configStorage: BellConfigStorageService,
) {
  timerStorage.updateTimer(reset(getTotalDuration(configStorage.bellConfig)));
}

/**
 * Timer Reset UseCase Hook
 */
export function useResetTimer() {
  const timerStorage = useTimerStorage();
  const configStorage = useBellConfigStorage();

  return () => resetTimer(timerStorage, configStorage);
}

/**
 * Timer Start UseCase Hook
 */
export function useStartTimer() {
  const timerStorage = useTimerStorage();
  return () => timerStorage.updateTimer(start(timerStorage.timer));
}

/**
 * Timer Pause UseCase Hook
 */
export function usePauseTimer() {
  const timerStorage = useTimerStorage();
  return () => timerStorage.updateTimer(pause(timerStorage.timer));
}

/**
 * Bell Config Update UseCase Hook
 */
export function useUpdateBellConfig() {
  const configStorage = useBellConfigStorage();
  const timerStorage = useTimerStorage();

  return (config: BellConfig): BellConfig => {
    // バリデーションと作成 (Domain層のルール適用)
    const newConfig = createBellConfig(
      config.first,
      config.second,
      config.third,
      config.firstEnabled,
      config.secondEnabled,
      config.thirdEnabled,
    );

    // ストレージの更新
    configStorage.updateBellConfig(newConfig);

    // タイマーの設定変更を即座に反映 (タイマーのリセット)
    timerStorage.updateTimer(reset(getTotalDuration(newConfig)));

    return newConfig;
  };
}

/**
 * Timer Tick UseCase Hook
 */
export function useTickTimer() {
  const timerStorage = useTimerStorage();
  const configStorage = useBellConfigStorage();
  const player = useBellPlayer();

  return () => {
    const { timer } = timerStorage;
    const { bellConfig } = configStorage;

    const nextBase = tick(timer);
    const progress = createProgress(
      nextBase.remainingSeconds,
      getTotalDuration(bellConfig),
    );
    const bellToRing = getBellToRing(nextBase.remainingSeconds, bellConfig);

    timerStorage.updateTimer({
      ...nextBase,
      progress,
    });

    if (bellToRing) {
      player.play(bellToRing);
    }
  };
}

/**
 * Timer UseCase Hook (Application Layer)
 * UIなど、全てのタイマー操作が必要な場所で利用する集約フック
 */
export function useTimerActions() {
  return {
    startTimer: useStartTimer(),
    pauseTimer: usePauseTimer(),
    resetTimer: useResetTimer(),
    tickTimer: useTickTimer(),
    updateBellConfig: useUpdateBellConfig(),
  };
}
