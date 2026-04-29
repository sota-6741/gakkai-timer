/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { loadItem, STORAGE_KEYS } from "../storagePersistence";

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

describe("storagePersistence", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  describe("loadItem", () => {
    it("値が存在しない場合はデフォルト値を返すこと", () => {
      const result = loadItem(STORAGE_KEYS.currentIndex, 0);
      expect(result).toBe(0);
    });

    it("正しいJSONが保存されている場合はパースした値を返すこと", () => {
      window.localStorage.setItem(STORAGE_KEYS.currentIndex, "5");
      const result = loadItem(STORAGE_KEYS.currentIndex, 0);
      expect(result).toBe(5);
    });

    it("JSONが壊れている場合はデフォルト値を返すこと", () => {
      window.localStorage.setItem(STORAGE_KEYS.currentIndex, "invalid-json");
      const result = loadItem(STORAGE_KEYS.currentIndex, 0);
      expect(result).toBe(0);
    });

    it("オブジェクトのパースができること", () => {
      const config = { first: 10, second: 20, third: 30 };
      window.localStorage.setItem(STORAGE_KEYS.bellConfig, JSON.stringify(config));
      const result = loadItem(STORAGE_KEYS.bellConfig, { first: 0, second: 0, third: 0 });
      expect(result).toEqual(config);
    });
  });
});
