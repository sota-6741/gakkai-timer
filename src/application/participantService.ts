import { useParticipantStorage } from "../service/storageAdapter";
import { useParticipantParser } from "../service/participantParserAdapter";
import { useResetTimer } from "./timerService";

export function useParticipantActions() {
  const participantStorage = useParticipantStorage();
  const parser = useParticipantParser();
  const resetTimer = useResetTimer();

  function importParticipants(tomlString: string): void {
    const list = parser.parse(tomlString);
    participantStorage.updateParticipants(list);
    participantStorage.updateCurrentIndex(0);
    resetTimer();
  }

  function nextParticipant(): void {
    const { participants, currentIndex } = participantStorage;
    if (currentIndex < participants.length - 1) {
      participantStorage.updateCurrentIndex(currentIndex + 1);
      resetTimer();
    }
  }

  function prevParticipant(): void {
    const { currentIndex } = participantStorage;
    if (currentIndex > 0) {
      participantStorage.updateCurrentIndex(currentIndex - 1);
      resetTimer();
    }
  }

  return { importParticipants, nextParticipant, prevParticipant };
}
