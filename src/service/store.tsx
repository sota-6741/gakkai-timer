import React, { useState } from "react";
import { type BellConfig, DEFAULT_BELL_CONFIG } from '../domain/bellConfig';
import { type Timer, reset } from '../domain/timer';
import type { Participant } from '../domain/participant';
import { StoreContext } from "./storeContext";

export const Provider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [bellConfig, setBellConfig] = useState<BellConfig>(() => {
    const saved = localStorage.getItem('timer_config');
    return saved ? JSON.parse(saved) : DEFAULT_BELL_CONFIG;
  });

  const [timer, setTimer] = useState<Timer>(() => reset(bellConfig.third));

  // 参加者管理の状態を追加
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
