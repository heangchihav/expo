// src/contexts/ThemeContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

export type Theme = 'system' | 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'system',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('system');

  // Determine system theme
  useEffect(() => {
    const systemTheme = Appearance.getColorScheme();
    if (theme === 'system' && systemTheme) {
      setTheme(systemTheme as Theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
