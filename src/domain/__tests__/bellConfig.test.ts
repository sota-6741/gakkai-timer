import { describe, it, expect } from 'vitest';
import { createBellConfig } from '../bellConfig';

describe('BellConfig Domain Logic', () => {
  // --- 正常系 ---
  it('正しい順序（first < second < third）で設定が作成できること', () => {
    const config = createBellConfig(480, 600, 900);
    expect(config.first).toBe(480);
    expect(config.firstEnabled).toBe(true);
    expect(config.secondEnabled).toBe(true);
    expect(config.thirdEnabled).toBe(true);
  });

  it('有効フラグを個別に設定できること', () => {
    const config = createBellConfig(480, 600, 900, false, true, false);
    expect(config.firstEnabled).toBe(false);
    expect(config.secondEnabled).toBe(true);
    expect(config.thirdEnabled).toBe(false);
  });

  it('全てのベルを無効にしようとするとエラーを投げること', () => {
    expect(() => createBellConfig(480, 600, 900, false, false, false)).toThrow('少なくとも1つのベルを有効にしてください');
  });

  it('有効なベル間での順序が不正な場合にエラーを投げること', () => {
    // 1st と 3rd が有効で、1st >= 3rd の場合
    expect(() => createBellConfig(1000, 600, 900, true, false, true)).toThrow('ベルの順序が正しくありません (1st >= 3rd)');
  });

  describe('getTotalDuration', () => {
    it('3rdが有効なら3rdの時間を返す', () => {
      const config = createBellConfig(100, 200, 300, true, true, true);
      expect(getTotalDuration(config)).toBe(300);
    });

    it('3rdが無効で2ndが有効なら2ndの時間を返す', () => {
      const config = createBellConfig(100, 200, 300, true, true, false);
      expect(getTotalDuration(config)).toBe(200);
    });

    it('1stのみ有効なら1stの時間を返す', () => {
      const config = createBellConfig(100, 200, 300, true, false, false);
      expect(getTotalDuration(config)).toBe(100);
    });
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
