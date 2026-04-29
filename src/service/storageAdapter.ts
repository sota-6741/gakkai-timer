import type {
  BellConfigStorageService,
  TimerStorageService,
  ParticipantStorageService,
} from "../application/ports";
import { useStore } from "./storeContext";
import type { BellConfig } from "../domain/bellConfig";
import type { Participant } from "../domain/participant";
import { STORAGE_KEYS, setItem } from "./storagePersistence";

export function useBellConfigStorage(): BellConfigStorageService {
  const store = useStore();
  return {
    bellConfig: store.bellConfig,
    updateBellConfig: (config: BellConfig) => {
      store.updateBellConfig(config);
      setItem(STORAGE_KEYS.bellConfig, JSON.stringify(config));
    },
  };
}

export function useTimerStorage(): TimerStorageService {
  const store = useStore();
  return {
    timer: store.timer,
    updateTimer: store.updateTimer,
  };
}

export function useParticipantStorage(): ParticipantStorageService {
  const store = useStore();
  return {
    participants: store.participants,
    currentIndex: store.currentIndex,
    updateParticipants: (list: Participant[]) => {
      store.updateParticipants(list);
      setItem(STORAGE_KEYS.participants, JSON.stringify(list));
    },
    updateCurrentIndex: (index: number) => {
      store.updateCurrentIndex(index);
      setItem(STORAGE_KEYS.currentIndex, JSON.stringify(index));
    },
  };
}
