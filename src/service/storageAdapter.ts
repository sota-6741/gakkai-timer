import type { BellConfigStorageService, TimerStorageService, ParticipantStorageService } from "../application/ports";
import { useStore } from "./storeContext";

export function useBellConfigStorage(): BellConfigStorageService {
  return useStore();
}

export function useTimerStorage(): TimerStorageService {
  return useStore();
}

export function useParticipantStorage(): ParticipantStorageService {
  return useStore();
}
