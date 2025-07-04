import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../context/ThemeContext';
import { styles } from '../../theme/styles';
import { useFocusEffect } from '@react-navigation/native';

export function ProfileInfo() {
  const { theme, toggleTheme } = useAppTheme();
  const [concluidas, setConcluidas] = useState(0);
  const [pendentes, setPendentes] = useState(0);

  const carregarResumo = async () => {
    try {
      const res = await fetch('http://localhost:8080/tarefas/resumo');
      const json = await res.json();
      setConcluidas(json.concluidas);
      setPendentes(json.pendentes);
    } catch (error) {
      console.log('Erro ao buscar resumo:', error.message);
    }
  };

  // Atualiza sempre que a tela voltar ao foco
  useFocusEffect(
    useCallback(() => {
      carregarResumo();
    }, [])
  );

  return (
    <View style={[styles.perfil, { backgroundColor: theme.background }]}>
      <View style={{ flexDirection: 'row' }}>
        <Ionicons name="person-circle-outline" size={100} color={theme.primary} />
        <View>
          <Text style={{ fontSize: 20, marginTop: 16, color: theme.text }}>Seu Nome</Text>
          <Text style={{ color: theme.placeholder, marginTop: 4 }}>seu@email.com</Text>
        </View>
      </View>

      <View style={[styles.containerTarefa]}>
        <View style={[styles.itemTarefa, { marginRight: 10 }]}>
          <Text style={{ margin: 10 }}>{concluidas}</Text>
          <Text>Tarefas Concluídas</Text>
        </View>

        <View style={[styles.itemTarefa, { marginLeft: 10 }]}>
          <Text style={{ margin: 10 }}>{pendentes}</Text>
          <Text>Tarefas Pendentes</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={toggleTheme}
        style={[styles.botaoAdd, { backgroundColor: theme.primary, marginTop: 30 }]}
      >
        <Text style={{ color: theme.onPrimary }}>
          Mudar para tema {theme.mode === 'light' ? 'escuro' : 'claro'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
