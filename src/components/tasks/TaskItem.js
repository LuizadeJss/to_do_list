import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../context/ThemeContext';
import { styles } from '../../theme/styles';

// Função simples para formatar data de yyyy-MM-dd para dd/MM/yyyy
const formatarData = (isoString) => {
  if (!isoString) return '';
  const [ano, mes, dia] = isoString.split('-');
  return `${dia}/${mes}/${ano}`;
};

export function TaskItem({ item, onToggleComplete, onRemove }) {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.item, { backgroundColor: theme.itemBackground }]}>
      <TouchableOpacity onPress={() => onToggleComplete(item.id)}>
        <Ionicons
          name={item.concluida ? 'checkbox' : 'square-outline'}
          size={24}
          color={theme.primary}
        />
      </TouchableOpacity>

      <View style={styles.itemTextoContainer}>
        <Text
          style={[
            styles.itemTexto,
            {
              color: theme.text,
              textDecorationLine: item.concluida ? 'line-through' : 'none',
            },
          ]}
        >
          {item.texto}
        </Text>

        {/* Mostrar a data formatada */}
        {item.data && (
          <Text style={[styles.itemData, { color: theme.textSecondary }]}>
            {formatarData(item.data)}
          </Text>
        )}
      </View>

      <TouchableOpacity onPress={() => onRemove(item.id)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
}
