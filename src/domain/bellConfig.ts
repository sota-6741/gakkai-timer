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

// 設定の整合性チェック
export function createBellConfig(
  first: number,
  second: number,
  third: number,
  firstEnabled: boolean = true,
  secondEnabled: boolean = true,
  thirdEnabled: boolean = true,
): BellConfig {
  if (first >= second || second >= third) {
    throw new Error("ベルの順序が正しくありません");
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
