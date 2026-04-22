import React from 'react';
import { create } from 'zustand';
import { format, subDays, isSameDay } from 'date-fns';
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
// Persistent Storage Hooks
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
}
// Specialized Hook for Daily Logs (Pillars, Pulses, etc.)
export function useDailyLog<T>(prefix: string, initialValue: T) {
  const today = getTodayStr();
  return useLocalStorage<T>(`${prefix}_${today}`, initialValue);
}
// Shame Protocol Logic: Check if Voice Pillar is missing for last 5 days
export function useShameProtocol() {
  const checkDays = 5;
  const isTriggered = React.useMemo(() => {
    let missingCount = 0;
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
  const streak = React.useMemo(() => {
    let count = 0;
    let curr = new Date();
    while (true) {
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