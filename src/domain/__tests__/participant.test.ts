import { describe, it, expect } from 'vitest';
import { createParticipant, createParticipantList } from '../participant';

describe('Participant Domain Logic', () => {
  // --- 正常系 ---
  it('正しいデータから Participant オブジェクトが作成されること', () => {
    const raw = { name: 'hogehoge', title: 'fugafuga' };
    const result = createParticipant(raw);
    expect(result.name).toBe('hogehoge');
    expect(result.title).toBe('fugafuga');
  });

  it('リスト形式の生データから Participant 配列が作成されること', () => {
    const rawItems = [
      { name: 'piyopiyo', title: 'bazbaz' },
      { name: 'hogehoge', title: 'fugafuga' }
    ];
    const result = createParticipantList(rawItems);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('piyopiyo');
  });

  // --- 異常系 ---
  it('名前が欠落している場合はエラーを投げること', () => {
    const raw = { title: 'fugafuga' };
    expect(() => createParticipant(raw)).toThrow('参加者の名前が入力されていないデータが含まれています');
  });

  it('タイトルが欠落している場合はエラーを投げること', () => {
    const raw = { name: 'hogehoge' };
    expect(() => createParticipant(raw)).toThrow('さんの発表タイトルが入力されていません');
  });

  it('配列でないデータが来た場合はエラーを投げること', () => {
    // メッセージを実装と完全に一致させる
    expect(() => createParticipantList('not an array')).toThrow('読み込んだデータが正しい名簿形式（配列）ではありません');
  });

  // --- 境界値・サニタイズ ---
  it('名前に余分な空白がある場合、トリムされること', () => {
    const raw = { name: '  hogehoge  ', title: 'fugafuga' };
    const result = createParticipant(raw);
    expect(result.name).toBe('hogehoge');
  });
});
