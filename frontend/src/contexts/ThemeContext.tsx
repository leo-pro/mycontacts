import {
  createContext, ReactNode, useLayoutEffect, useMemo, useState,
} from 'react';
import { ThemeProvider as ThemeStyledProvider } from 'styled-components';

import themes from '../assets/styles/themes';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ThemeContextData {
  handleToggleTheme: (themeSelected: string) => void
  theme: string
}

export const ThemeContext = createContext({} as ThemeContextData);

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }:ThemeProviderProps) {
  const [storageTheme, setStorageTheme] = useLocalStorage('MyContacts:theme', '');

  const [theme, setTheme] = useState<string>('');

  useLayoutEffect(() => {
    setTheme(storageTheme || 'light');
  }, [storageTheme]);

  const handleToggleTheme = (themeSelected: string) => {
    setTheme(themeSelected);
    setStorageTheme(themeSelected);
  };

  const currentTheme = useMemo(() => (
    theme === 'light' ? themes.light : themes.dark
  ), [theme]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
      <ThemeStyledProvider theme={currentTheme}>
        {children}
      </ThemeStyledProvider>
    </ThemeContext.Provider>
  );
}
