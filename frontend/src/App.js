// Componente principal
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppNavigator } from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';

export function App() {
  return (
   
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
  );
}