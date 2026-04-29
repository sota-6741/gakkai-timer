export const STORAGE_KEYS = {
  bellConfig: "timer_config",
  participants: "timer_perticipants",
  currentIndex: "timer_current_index",
} as const;

export function getItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function loadItem<T>(key: string, defaultValue: T): T {
  const saved = getItem(key);
  if (!saved) return defaultValue;
  try {
    return JSON.parse(saved) as T;
  } catch {
    return defaultValue;
  }
}

export function setItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {}
}
