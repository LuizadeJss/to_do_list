// Tela principal de tarefas
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';
import { styles } from '../theme/styles';
import { TaskGroupList } from '../components/tasks/TaskGroupList';
import { AddTaskModal } from '../components/tasks/AddTaskModal';

export function TasksScreen() {
  const { theme } = useAppTheme();
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);

  // Estado para data selecionada na adição
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return;

    setTarefas([
      ...tarefas,
      {
        id: Date.now().toString(),
        texto: novaTarefa,
        concluida: false,
        data: dataSelecionada.toISOString(), // armazenar ISO string
      },
    ]);
    setNovaTarefa('');
    setDataSelecionada(new Date());
    setModalVisivel(false);
  };

  const toggleConcluida = (id) => {
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  const removerTarefa = (id) => {
    setTarefas((prev) => prev.filter((tarefa) => tarefa.id !== id));
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <TaskGroupList 
        tarefas={tarefas} 
        onToggleComplete={toggleConcluida} 
        onRemove={removerTarefa} 
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={() => setModalVisivel(true)}
      >
        <Ionicons name="add" size={32} color={theme.onPrimary} />
      </TouchableOpacity>

      <AddTaskModal 
        visible={modalVisivel}
        novaTarefa={novaTarefa}
        setNovaTarefa={setNovaTarefa}
        dataSelecionada={dataSelecionada}
        setDataSelecionada={setDataSelecionada}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        adicionarTarefa={adicionarTarefa}
        onCancel={() => setModalVisivel(false)}
      />
    </View>
  );
}