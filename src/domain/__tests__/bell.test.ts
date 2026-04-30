import { describe, it, expect } from 'vitest';
import { getBellToRing, BellType } from '../bell';
import type { BellConfig } from '../bellConfig';

describe('Bell Domain Logic', () => {
  const config: BellConfig = {
    first: 480,  // 8分
    firstEnabled: true,
    second: 600, // 10分
    secondEnabled: true,
    third: 900,  // 15分
    thirdEnabled: true
  };

  const disabledConfig: BellConfig = {
    ...config,
    firstEnabled: false,
    secondEnabled: false,
    thirdEnabled: false
  };

  // --- 正常系 ---
  it('ジャスト8分経過時に1鈴を鳴らす判定になること', () => {
    const remaining = 900 - 480; // 420秒
    expect(getBellToRing(remaining, config)).toBe(BellType.FIRST);
  });

  it('ベルが無効な場合は鳴らさない判定になること', () => {
    const remainingFirst = 900 - 480;
    const remainingSecond = 900 - 600;
    const remainingThird = 0;

    expect(getBellToRing(remainingFirst, disabledConfig)).toBeNull();
    expect(getBellToRing(remainingSecond, disabledConfig)).toBeNull();
    expect(getBellToRing(remainingThird, disabledConfig)).toBeNull();
  });

  it('2ndが最後の有効なベルの場合、2ndの時間で終了鈴が鳴ること', () => {
    const config2nd: BellConfig = {
      ...config,
      thirdEnabled: false
    };
    // 2ndの時間（600秒）が総時間になるので、残り0秒で2ndが鳴る
    expect(getBellToRing(0, config2nd)).toBe(BellType.SECOND);
  });

  it('ジャスト10分経過時に2鈴を鳴らす判定になること', () => {
    const remaining = 900 - 600; // 300秒
    expect(getBellToRing(remaining, config)).toBe(BellType.SECOND);
  });

  it('ジャスト15分経過時に終鈴を鳴らす判定になること', () => {
    const remaining = 0;
    expect(getBellToRing(remaining, config)).toBe(BellType.THIRD);
  });

  // --- 異常系・その他 ---
  it('設定されていない時間では null を返すこと', () => {
    expect(getBellToRing(800, config)).toBeNull();
    expect(getBellToRing(10, config)).toBeNull();
  });

  // --- 境界値 ---
  it('1鈴の1秒前と1秒後では鳴らさないこと', () => {
    const target = 900 - 480;
    expect(getBellToRing(target + 1, config)).toBeNull();
    expect(getBellToRing(target - 1, config)).toBeNull();
  });

  it('終了時刻（0秒）の直前では鳴らさないこと', () => {
    expect(getBellToRing(1, config)).toBeNull();
  });
});
