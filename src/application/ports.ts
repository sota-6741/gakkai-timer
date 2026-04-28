import type { BellConfig } from "../domain/bellConfig";
import type { Timer } from "../domain/timer";
import type { BellType } from "../domain/bell";
import type { Participant } from "../domain/participant";

export interface BellConfigStorageService {
  bellConfig: BellConfig;
  updateBellConfig(config: BellConfig): void;
}

export interface TimerStorageService {
  timer: Timer;
  updateTimer(timer: Timer): void;
}

export interface ParticipantStorageService {
  participants: Participant[];
  currentIndex: number;
  updateParticipants(participants: Participant[]): void;
  updateCurrentIndex(index: number): void;
}

export interface ParticipantParserService {
  parse(tomlString: string): Participant[];
}

export interface BellPlayer {
  play(type: BellType): void;
}
