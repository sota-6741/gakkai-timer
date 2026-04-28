import type { BellPlayer } from "../application/ports";
import { BellType } from "../domain/bell";

/**
 * ベルのタイプと音声ファイルの対応表
 * 事前に Audio オブジェクトを生成してプリロードする
 */
const audioMap: Record<BellType, HTMLAudioElement | null> = {
  [BellType.FIRST]: typeof Audio !== "undefined" ? new Audio(`${import.meta.env.BASE_URL}sounds/bell1.mp3`) : null,
  [BellType.SECOND]: typeof Audio !== "undefined" ? new Audio(`${import.meta.env.BASE_URL}sounds/bell2.mp3`) : null,
  [BellType.THIRD]: typeof Audio !== "undefined" ? new Audio(`${import.meta.env.BASE_URL}sounds/bell3.mp3`) : null,
};

/**
 * Audio Adapter (Service Layer)
 */
export function useBellPlayer(): BellPlayer {
  return {
    play: (type: BellType) => {
      const audio = audioMap[type];
      if (!audio) return;

      // 再生中の場合は最初に戻す
      audio.currentTime = 0;
      audio.play().catch((error) => {
        // ユーザーのインタラクション前に再生しようとするとエラーになる場合がある
        console.warn(`Playback failed for ${type}:`, error);
      });
    },
  };
}
