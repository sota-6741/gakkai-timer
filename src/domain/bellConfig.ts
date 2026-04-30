export interface BellConfig {
  readonly first: number;
  readonly firstEnabled: boolean;
  readonly second: number;
  readonly secondEnabled: boolean;
  readonly third: number;
  readonly thirdEnabled: boolean;
}

export const DEFAULT_BELL_CONFIG: BellConfig = {
  first: 540, // 9分
  firstEnabled: true,
  second: 600, // 10分
  secondEnabled: true,
  third: 900, // 15分
  thirdEnabled: true,
};

/**
 * 有効なベルのうち、最も遅い時間をタイマーの総時間とする
 */
export function getTotalDuration(config: BellConfig): number {
  if (config.thirdEnabled) return config.third;
  if (config.secondEnabled) return config.second;
  if (config.firstEnabled) return config.first;
  return config.third; // 基本的にここには到達しない（バリデーションで防ぐ）
}

// 設定の整合性チェック
export function createBellConfig(
  first: number,
  second: number,
  third: number,
  firstEnabled: boolean = true,
  secondEnabled: boolean = true,
  thirdEnabled: boolean = true,
): BellConfig {
  if (!firstEnabled && !secondEnabled && !thirdEnabled) {
    throw new Error("少なくとも1つのベルを有効にしてください");
  }

  // 有効なベル間での順序チェック
  const enabledBells = [
    { time: first, enabled: firstEnabled, name: "1st" },
    { time: second, enabled: secondEnabled, name: "2nd" },
    { time: third, enabled: thirdEnabled, name: "3rd" },
  ].filter((b) => b.enabled);

  for (let i = 0; i < enabledBells.length - 1; i++) {
    if (enabledBells[i].time >= enabledBells[i + 1].time) {
      throw new Error(
        `ベルの順序が正しくありません (${enabledBells[i].name} >= ${
          enabledBells[i + 1].name
        })`,
      );
    }
  }

  return {
    first,
    firstEnabled,
    second,
    secondEnabled,
    third,
    thirdEnabled,
  };
}
