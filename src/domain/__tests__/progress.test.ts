import { describe, it, expect } from 'vitest';
import { createProgress } from '../progress';

describe('Progress Domain Logic', () => {
  // --- 正常系 ---
  it('タイマー開始時（残り時間が全時間と同じ）は進捗 0 であること', () => {
    expect(createProgress(900, 900)).toBe(0);
  });

  it('タイマー半分経過時は進捗 0.5 であること', () => {
    expect(createProgress(450, 900)).toBe(0.5);
  });

  it('タイマー終了時は進捗 1 であること', () => {
    expect(createProgress(0, 900)).toBe(1);
  });

  // --- 異常系・境界値ガード ---
  it('トータル時間が0以下の場合は 0 を返すこと', () => {
    expect(createProgress(10, 0)).toBe(0);
    expect(createProgress(10, -1)).toBe(0);
  });

  it('残り時間がトータル時間を超えている場合は 0 に丸められること', () => {
    expect(createProgress(1000, 900)).toBe(0);
  });

  it('残り時間がマイナスの場合は 1 に丸められること', () => {
    expect(createProgress(-10, 900)).toBe(1);
  });
});
