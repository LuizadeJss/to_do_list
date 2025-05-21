// Modal para adicionar tarefas

import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppTheme } from '../../context/ThemeContext';
import { formatDate } from '../../utils/dateUtils';
import { styles } from '../../theme/styles';

export function AddTaskModal({ 
  visible,
  novaTarefa,
  setNovaTarefa,
  dataSelecionada,
  setDataSelecionada,
  showDatePicker,
  setShowDatePicker,
  adicionarTarefa,
  onCancel
}) {
  const { theme } = useAppTheme();
  
  // Handler para alteração do datepicker
  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false); // fecha o picker no Android após seleção ou cancelamento
    }
    if (selectedDate) {
      setDataSelecionada(selectedDate);
    }
  };
  
  if (!visible) return null;
  
  return (
    <View style={styles.modalOverlay}>
      <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBackground,
              color: theme.text,
              marginBottom: 12,
            },
          ]}
          placeholder="Nova tarefa"
          placeholderTextColor={theme.placeholder}
          value={novaTarefa}
          onChangeText={setNovaTarefa}
          autoFocus
        />

        {/* Botão para abrir DatePicker */}
        <TouchableOpacity
          style={[styles.botaoAdd, { marginBottom: 12, backgroundColor: theme.primary }]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: theme.onPrimary }}>
            Data: {formatDate(dataSelecionada)}
          </Text>
        </TouchableOpacity>

        {/* Mostrar DatePicker quando showDatePicker for true */}
        {showDatePicker && (
          <DateTimePicker
            value={dataSelecionada}
            mode="date"
            display="default"
            onChange={onChangeDate}
            minimumDate={new Date(2000, 0, 1)}
            maximumDate={new Date(2100, 11, 31)}
          />
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={onCancel} style={{ marginRight: 12 }}>
            <Text style={{ color: theme.primary }}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={adicionarTarefa}>
            <Text style={{ color: theme.primary }}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}