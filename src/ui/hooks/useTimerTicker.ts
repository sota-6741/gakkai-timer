import { useEffect } from "react";
import { useTimerStorage } from "../../service/storageAdapter";
import { useTimerActions } from "../../application/timerService";

/**
 * UI Ticker Hook
 * 1秒ごとの「時間の経過」をユースケースに伝えます。
 */
export function useTimerTicker() {
  const { timer } = useTimerStorage();
  const { tickTimer } = useTimerActions();

  useEffect(() => {
    if (timer.timerStatus !== "RUNNING") return;

    const intervalId = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer.timerStatus, tickTimer]);
}
