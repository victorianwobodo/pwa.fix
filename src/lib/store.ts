import { create } from 'zustand';
import { format } from 'date-fns';
interface AscertaState {
  isPrepareOpen: boolean;
  setPrepareOpen: (open: boolean) => void;
}
export const useAscertaStore = create<AscertaState>((set) => ({
  isPrepareOpen: false,
  setPrepareOpen: (open) => set({ isPrepareOpen: open }),
}));
export const getTodayStr = () => format(new Date(), 'yyyy-MM-dd');
export const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
}
import React from 'react';