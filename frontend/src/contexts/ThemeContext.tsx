import {
  createContext, ReactNode, useMemo, useState,
} from 'react';
import { ThemeProvider as ThemeStyledProvider } from 'styled-components';

import themes from '../assets/styles/themes';

interface ThemeContextData {
  handleToggleTheme: (themeSelected: string) => void
  theme: string
}

export const ThemeContext = createContext({} as ThemeContextData);

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }:ThemeProviderProps) {
  const [theme, setTheme] = useState('light');

  const handleToggleTheme = (themeSelected: string) => {
    setTheme(themeSelected);
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
