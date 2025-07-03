// Contexto de tema e hook useAppTheme
import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from '../theme/themes';

// Criar o contexto
const ThemeContext = createContext();

// Provedor do contexto
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme);
  
  const toggleTheme = () => {
    setTheme((prev) => (prev.mode === 'light' ? darkTheme : lightTheme));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para usar o tema
export function useAppTheme() {
  return useContext(ThemeContext);
}