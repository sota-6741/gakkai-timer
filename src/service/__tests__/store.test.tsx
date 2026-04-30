/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { Provider } from "../store";
import { useStore } from "../storeContext";
import { STORAGE_KEYS } from "../storagePersistence";
import { vi } from "vitest";

// Mock localStorage because jsdom one seems broken in this environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    length: 0,
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Store Provider (Initialization)", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("participants が空の場合、currentIndex は必ず 0 になること", () => {
    window.localStorage.setItem(STORAGE_KEYS.participants, JSON.stringify([]));
    window.localStorage.setItem(STORAGE_KEYS.currentIndex, "5");

    const { result } = renderHook(() => useStore(), { 
      wrapper: ({ children }) => <Provider>{children}</Provider> 
    });

    expect(result.current.participants).toEqual([]);
    expect(result.current.currentIndex).toBe(0);
  });

  it("currentIndex が participants の範囲外の場合、最大値に制限されること", () => {
    const participants = [
      { name: "P1", title: "T1" },
      { name: "P2", title: "T2" }
    ];
    window.localStorage.setItem(STORAGE_KEYS.participants, JSON.stringify(participants));
    window.localStorage.setItem(STORAGE_KEYS.currentIndex, "5"); // 範囲外

    const { result } = renderHook(() => useStore(), { 
      wrapper: ({ children }) => <Provider>{children}</Provider> 
    });

    expect(result.current.participants).toHaveLength(2);
    expect(result.current.currentIndex).toBe(1); // 最後のインデックス
  });

  it("JSON が壊れている場合にデフォルト値が使われること", () => {
    window.localStorage.setItem(STORAGE_KEYS.participants, "invalid-json");
    
    const { result } = renderHook(() => useStore(), { 
      wrapper: ({ children }) => <Provider>{children}</Provider> 
    });

    expect(result.current.participants).toEqual([]);
    expect(result.current.currentIndex).toBe(0);
  });

  it("古い形式の bellConfig (enabledフラグなし) を読み込んだ場合、デフォルトで true になること", () => {
    window.localStorage.setItem(STORAGE_KEYS.bellConfig, JSON.stringify({ first: 100, second: 200, third: 300 }));
    
    const { result } = renderHook(() => useStore(), { 
      wrapper: ({ children }) => <Provider>{children}</Provider> 
    });

    expect(result.current.bellConfig.firstEnabled).toBe(true);
    expect(result.current.bellConfig.secondEnabled).toBe(true);
    expect(result.current.bellConfig.thirdEnabled).toBe(true);
  });
});
