import { parse as parseToml } from "smol-toml";
import { createParticipantList, type Participant } from "../../domain/participant";

export const tomlParticipantParser = {
  parse(content: string): Participant[] {
    try {
      const rawData = parseToml(content) as Record<string, unknown>;
      const items = rawData.participants || rawData.speaker;
      return createParticipantList(items);
    } catch (error) {
      throw new Error(`TOMLの解析に失敗しました: ${error instanceof Error ? error.message : "不明なエラー"}`, { cause: error });
    }
  }
};
