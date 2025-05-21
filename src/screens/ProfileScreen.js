// Tela de perfil
import React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import { ProfileInfo } from '../components/profile/ProfileInfo';
import { styles } from '../theme/styles';

export function ProfileScreen() {
  const { theme } = useAppTheme();
  
  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ProfileInfo />
    </View>
  );
}