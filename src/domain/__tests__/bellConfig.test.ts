import { describe, it, expect } from 'vitest';
import { createBellConfig } from '../bellConfig';

describe('BellConfig Domain Logic', () => {
  // --- 正常系 ---
  it('正しい順序（first < second < third）で設定が作成できること', () => {
    const config = createBellConfig(480, 600, 900);
    expect(config.first).toBe(480);
    expect(config.third).toBe(900);
  });

  // --- 異常系 ---
  it('順序が逆転している（first > second）場合にエラーを投げること', () => {
    expect(() => createBellConfig(600, 480, 900)).toThrow('ベルの順序が正しくありません');
  });

  it('順序が等しい場合にエラーを投げること', () => {
    expect(() => createBellConfig(480, 480, 900)).toThrow('ベルの順序が正しくありません');
  });

  it('thirdが最小の場合にエラーを投げること', () => {
    expect(() => createBellConfig(480, 600, 300)).toThrow('ベルの順序が正しくありません');
  });
});
