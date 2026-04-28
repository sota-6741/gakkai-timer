import { describe, it, expect } from 'vitest';
import { csvParticipantParser } from '../csvParser';

describe('csvParticipantParser', () => {
  it('ヘッダーなしの標準的なCSVをパースできること', () => {
    const csv = `hogehoge,fugafuga
piyopiyo,bazbaz`;
    
    const result = csvParticipantParser.parse(csv);
    
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ name: 'hogehoge', title: 'fugafuga' });
    expect(result[1]).toEqual({ name: 'piyopiyo', title: 'bazbaz' });
  });

  it('ヘッダーありのCSVをパースできること', () => {
    const csv = `名前,タイトル
hogehoge,fugafuga
piyopiyo,bazbaz`;
    
    const result = csvParticipantParser.parse(csv);
    
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('hogehoge');
  });

  it('タブ区切り（Excelからのコピペ）をパースできること', () => {
    const tsv = `hogehoge\tfugafuga
piyopiyo\tbazbaz`;
    
    const result = csvParticipantParser.parse(tsv);
    
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('hogehoge');
    expect(result[0].title).toBe('fugafuga');
  });

  it('空行をスキップすること', () => {
    const csv = `
    
hogehoge,fugafuga

piyopiyo,bazbaz
`;
    
    const result = csvParticipantParser.parse(csv);
    expect(result).toHaveLength(2);
  });
});
