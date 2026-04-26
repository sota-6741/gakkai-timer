export interface BellConfig {
  readonly first: number;
  readonly second: number;
  readonly third: number;
}

// 設定の整合性チェック
export function createBellConfig(first: number, second: number, third: number): BellConfig {
  if (first >= second || second >= third) {
    throw new Error("ベルの順序が正しくありません");
  }
  return { first, second, third };
}
