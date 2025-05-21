// Componente principal
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppNavigator } from './navigation/AppNavigator';

export function App() {
  return (
   
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
  );
}