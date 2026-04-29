import React, { useState } from "react";
import {
  type BellConfig,
  DEFAULT_BELL_CONFIG,
  createBellConfig,
} from "../domain/bellConfig";
import { type Timer, reset } from "../domain/timer";
import {
  type Participant,
  createParticipantList,
} from "../domain/participant";
import { StoreContext } from "./storeContext";
import { STORAGE_KEYS, loadItem } from "./storagePersistence";

export const Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bellConfig, setBellConfig] = useState<BellConfig>(() => {
    try {
      const saved = loadItem(STORAGE_KEYS.bellConfig, DEFAULT_BELL_CONFIG);
      if (saved === DEFAULT_BELL_CONFIG) return DEFAULT_BELL_CONFIG;
      return createBellConfig(saved.first, saved.second, saved.third);
    } catch {
      return DEFAULT_BELL_CONFIG;
    }
  });

  const [timer, setTimer] = useState<Timer>(() => reset(bellConfig.third));

  // 参加者管理の状態を追加
  const [participants, setParticipants] = useState<Participant[]>(() => {
    try {
      const saved = loadItem<any[]>(STORAGE_KEYS.participants, []);
      return createParticipantList(saved);
    } catch {
      return [];
    }
  });

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const saved = loadItem(STORAGE_KEYS.currentIndex, 0);
    // 復元した index が範囲内かチェック
    if (participants.length === 0) return 0;
    return Math.max(0, Math.min(saved, participants.length - 1));
  });

  const value = {
    bellConfig,
    updateBellConfig: setBellConfig,
    timer,
    updateTimer: setTimer,
    participants,
    updateParticipants: setParticipants,
    currentIndex,
    updateCurrentIndex: setCurrentIndex,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
