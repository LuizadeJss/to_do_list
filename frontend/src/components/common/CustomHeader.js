// Componente do cabeçalho
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../context/ThemeContext';
import { styles } from '../../theme/styles';

export function CustomHeader({ title, onOpenMenu }) {
  const { theme } = useAppTheme();
  
  return (
    <View style={[styles.header, { backgroundColor: theme.primary }]}>
      <TouchableOpacity onPress={onOpenMenu}>
        <Ionicons name="menu" size={24} color={theme.onPrimary} />
      </TouchableOpacity>
      <Text style={[styles.headerText, { color: theme.onPrimary }]}>{title}</Text>
      <View style={{ width: 24 }}/>
    </View>
  );
}