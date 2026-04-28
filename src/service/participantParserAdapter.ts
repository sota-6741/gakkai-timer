import type { ParticipantParserService } from "../application/ports";
import type { Participant } from "../domain/participant";
import { csvParticipantParser } from "./parsers/csvParser";
import { tomlParticipantParser } from "./parsers/tomlParser";

export function useParticipantParser(): ParticipantParserService {
  return {
    parse(content: string): Participant[] {
      const trimmed = content.trim();

      // TOML 判定ロジック
      if (trimmed.includes("[[") && trimmed.includes("]]")) {
        return tomlParticipantParser.parse(trimmed);
      }

      // デフォルト（CSV/TSV）
      return csvParticipantParser.parse(trimmed);
    },
  };
}
