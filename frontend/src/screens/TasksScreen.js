import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';
import { styles } from '../theme/styles';
import { TaskGroupList } from '../components/tasks/TaskGroupList';
import { AddTaskModal } from '../components/tasks/AddTaskModal';

const URL = 'https://servidorrest-j8ec.onrender.com/tarefas';

export function TasksScreen() {
  const { theme } = useAppTheme();
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);

  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  //Buscar tarefas 
  const carregarTarefas = async () => {
  try {
    const res = await fetch(URL);
    const json = await res.json();
    
    setTarefas(json);
          
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error.message);
  }
};

  useEffect(() => {
    carregarTarefas();
  }, []);

  //Adicionar tarefa
    const adicionarTarefa = async () => {
    if (novaTarefa.trim() === '') return;

    const nova = {
      novaTarefa: novaTarefa,
      concluida: false,
      // "yyyy-MM-dd"
      dataTarefa: dataSelecionada.toISOString().split('T')[0],
    };

    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nova),
      });

      if (res.ok) {
        setNovaTarefa('');
        setDataSelecionada(new Date());
        setModalVisivel(false);
        carregarTarefas(); 
      } else {
        Alert.alert('Erro', 'Falha ao adicionar tarefa');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na comunicação com o servidor');
    }
  };

  //Marcar como concluída
  const toggleConcluida = async (id) => {
    try {
      await fetch(`${URL}/${id}/concluir`, { method: 'PUT' });
      carregarTarefas();
    } catch (error) {
      console.log("Erro ao concluir tarefa:", error);
    }
  };

  //Remover tarefa
  const removerTarefa = async (id) => {
    try {
      const res = await fetch(`${URL}/${id}`, { method: 'DELETE' });

      if (res.ok) {
        carregarTarefas(); // Atualiza a lista
      } else {
        console.log(`Falha ao remover tarefa. Status: ${res.status}`);
      }
    } catch (error) {
      console.log("Erro ao remover tarefa:", error);
    }
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