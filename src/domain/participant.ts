export interface Participant {
  readonly name: string;
  readonly title: string;
}

/**
 * 外部（TOML等）から入力される可能性がある、未検証のデータ構造
 */
export interface RawParticipant {
  readonly name?: string | null;
  readonly title?: string | null;
}

/**
 * 個別の参加者を検証して作成する
 * 名前またはタイトルが空の場合はエラーを投げる
 */
export function createParticipant(raw: RawParticipant): Participant {
  const name = (raw.name || "").trim();
  const title = (raw.title || "").trim();

  if (!name) {
    throw new Error("参加者の名前が入力されていないデータが含まれています");
  }

  if (!title) {
    throw new Error(`${name}さんの発表タイトルが入力されていません`);
  }

  return {
    name,
    title,
  };
}

/**
 * 外部データの配列を検証し、正しいドメインモデルのリストに変換する
 */
export function createParticipantList(items: unknown): Participant[] {
  if (!Array.isArray(items)) {
    throw new Error("読み込んだデータが正しい名簿形式（配列）ではありません");
  }

  return items.map((item) => {
    const raw = item as RawParticipant;
    return createParticipant(raw);
  });
}
