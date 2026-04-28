import { createContext, useContext } from "react";
import type { BellConfig } from "../domain/bellConfig";
import type { Timer } from "../domain/timer";
import type { Participant } from "../domain/participant";

export interface StoreState {
  bellConfig: BellConfig;
  timer: Timer;
  updateBellConfig: (config: BellConfig) => void;
  updateTimer: (timer: Timer) => void;

  // 参加者管理
  participants: Participant[];
  updateParticipants: (list: Participant[]) => void;
  currentIndex: number;
  updateCurrentIndex: (index: number) => void;
}

export const StoreContext = createContext<StoreState | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a Provider");
  }
  return context;
};
