/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useParticipantActions } from '../participantService';
import * as storageAdapter from '../../service/storageAdapter';
import * as participantParserAdapter from '../../service/participantParserAdapter';

vi.mock('../../service/storageAdapter');
vi.mock('../../service/participantParserAdapter');

describe('Participant UseCase (Application Layer)', () => {
  const mockUpdateParticipants = vi.fn();
  const mockUpdateCurrentIndex = vi.fn();
  const mockUpdateTimer = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (storageAdapter.useParticipantStorage as any).mockReturnValue({
      participants: [{ name: 'hogehoge', title: 'fugafuga' }],
      currentIndex: 0,
      updateParticipants: mockUpdateParticipants,
      updateCurrentIndex: mockUpdateCurrentIndex,
    });

    (storageAdapter.useTimerStorage as any).mockReturnValue({
      updateTimer: mockUpdateTimer,
    });

    (storageAdapter.useBellConfigStorage as any).mockReturnValue({
      bellConfig: { third: 900 },
    });

    (participantParserAdapter.useParticipantParser as any).mockReturnValue({
      parse: vi.fn().mockReturnValue([
        { name: 'piyopiyo', title: 'bazbaz' }
      ]),
    });
  });

  it('importParticipants: 名簿が更新され、インデックスが0になり、タイマーがリセットされること', () => {
    const { result } = renderHook(() => useParticipantActions());
    result.current.importParticipants('dummy toml string');

    expect(mockUpdateParticipants).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ name: 'piyopiyo' })])
    );
    expect(mockUpdateCurrentIndex).toHaveBeenCalledWith(0);
    expect(mockUpdateTimer).toHaveBeenCalled(); // resetTimerが呼ばれたか
  });

  it('nextParticipant: インデックスが+1され、タイマーがリセットされること', () => {
    // 2人いる状態をセット
    (storageAdapter.useParticipantStorage as any).mockReturnValue({
      participants: [
        { name: 'hogehoge', title: 'fugafuga' },
        { name: 'piyopiyo', title: 'bazbaz' }
      ],
      currentIndex: 0,
      updateCurrentIndex: mockUpdateCurrentIndex,
    });

    const { result } = renderHook(() => useParticipantActions());
    result.current.nextParticipant();

    expect(mockUpdateCurrentIndex).toHaveBeenCalledWith(1);
    expect(mockUpdateTimer).toHaveBeenCalled();
  });
});
