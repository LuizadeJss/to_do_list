// Componente de informações do perfil
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../context/ThemeContext';
import { styles } from '../../theme/styles';

export function ProfileInfo() {
  const { theme, toggleTheme } = useAppTheme();
  
  return (
    <View style={[styles.perfil, { backgroundColor: theme.background }]}>
      <View style={{flexDirection: 'row'}}>
        <Ionicons name="person-circle-outline" size={100} color={theme.primary} />
        <View>
          <Text style={{ fontSize: 20, marginTop: 16, color: theme.text }}>Seu Nome</Text>
          <Text style={{ color: theme.placeholder, marginTop: 4 }}>seu@email.com</Text>
        </View>
      </View>
      
      <View style={[styles.containerTarefa]}>

          <View style={[styles.itemTarefa, {marginRight: 10}]}>
            <Text style={{margin: 10}}>0</Text>
            <Text>Tarefas Concluídas</Text>
          </View> 
          
          <View style={[styles.itemTarefa, {marginLeft: 10}]}> 
            <Text style={{margin: 10}}>0</Text>
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