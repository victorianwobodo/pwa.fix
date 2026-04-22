import { useState, useMemo, useEffect, useRef } from 'react';
import { create } from 'zustand';
import { format, subDays } from 'date-fns';
// UI Ephemeral State
interface AscertaState {
  isPrepareOpen: boolean;
  setPrepareOpen: (open: boolean) => void;
}
export const useAscertaStore = create<AscertaState>((set) => ({
  isPrepareOpen: false,
  setPrepareOpen: (open) => set({ isPrepareOpen: open }),
}));
// Business Logic & Helpers
export const getTodayStr = () => format(new Date(), 'yyyy-MM-dd');
export const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};
export const AFFIRMATIONS = [
  "My voice is a valuable strategic asset.",
  "Setting boundaries increases my professional impact.",
  "Direct communication is a form of kindness.",
  "I am the leader of my own time and energy.",
  "Clarity is more important than being liked.",
  "I trust my expertise and my instincts.",
  "I don't need permission to lead.",
  "Rest is a requirement for excellence.",
  "My presence is intentional and powerful.",
  "I speak my truth with calm confidence.",
  "I am building a sustainable leadership path.",
  "My limits are my strengths."
];
// Persistent Storage Hook with cross-tab/key-change synchronization
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // Use a ref to track the current key to detect changes without re-initializing during render
  const keyRef = useRef(key);
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return initialValue;
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  // Synchronize state if the key changes (e.g. date transition)
  useEffect(() => {
    if (keyRef.current !== key) {
      keyRef.current = key;
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (e) {
        setStoredValue(initialValue);
      }
    }
  }, [key, initialValue]);
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };
  return [storedValue, setValue];
}
// Specialized Hook for Daily Logs
export function useDailyLog<T>(prefix: string, initialValue: T) {
  const today = getTodayStr();
  const key = `${prefix}_${today}`;
  return useLocalStorage<T>(key, initialValue);
}
// Shame Protocol Logic: Check if Voice Pillar is missing for last 5 days
export function useShameProtocol() {
  const isTriggered = useMemo(() => {
    let missingCount = 0;
    const checkDays = 5;
    for (let i = 0; i < checkDays; i++) {
      const d = format(subDays(new Date(), i), 'yyyy-MM-dd');
      const data = window.localStorage.getItem(`Ascerta_voice_daily_${d}`);
      if (!data) missingCount++;
    }
    return missingCount >= checkDays;
  }, []);
  return isTriggered;
}
// Streak Calculation
export function useStreak() {
  const streak = useMemo(() => {
    let count = 0;
    let curr = new Date();
    // Safety limit to prevent infinite loops if storage is weird
    for (let i = 0; i < 365; i++) {
      const d = format(curr, 'yyyy-MM-dd');
      const data = window.localStorage.getItem(`Ascerta_checkin_${d}`);
      if (data) {
        count++;
        curr = subDays(curr, 1);
      } else {
        break;
      }
    }
    return count;
  }, []);
  return streak;
}