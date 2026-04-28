/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useParticipantParser } from '../participantParserAdapter';

describe('ParticipantParserAdapter (Service Layer Integration)', () => {
  it('TOMLを自動判別してパースできること', () => {
    const toml = `
[[speaker]]
name = "hogehoge"
title = "fugafuga"
    `;
    const { result } = renderHook(() => useParticipantParser());
    const participants = result.current.parse(toml);
    expect(participants).toHaveLength(1);
    expect(participants[0].name).toBe("hogehoge");
  });

  it('CSVを自動判別してパースできること', () => {
    const csv = "hogehoge,fugafuga";
    const { result } = renderHook(() => useParticipantParser());
    const participants = result.current.parse(csv);
    expect(participants).toHaveLength(1);
    expect(participants[0].name).toBe("hogehoge");
  });

  it('空の入力に対して空配列を返すこと', () => {
    const { result } = renderHook(() => useParticipantParser());
    expect(result.current.parse("")).toHaveLength(0);
  });
});
