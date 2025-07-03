// Wrapper para telas com cabeçalho
import React from 'react';
import { View } from 'react-native';
import { CustomHeader } from '../components/common/CustomHeader';

export function ScreenWithHeader({ title, children, onOpenMenu }) {
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title={title} onOpenMenu={onOpenMenu} />
      {children}
    </View>
  );
}