import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // eslint-disable-next-line consistent-return
  const [storagedValue, setStoragedValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('useLocalStorage:ERROR', error);
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storagedValue) : value;

      setStoragedValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('useLocalStorage:ERROR', error);
    }
  };

  return [storagedValue, setValue] as const;
}
