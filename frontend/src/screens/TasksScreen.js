import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';
import { styles } from '../theme/styles';
import { TaskGroupList } from '../components/tasks/TaskGroupList';
import { AddTaskModal } from '../components/tasks/AddTaskModal';

const URL = 'http://localhost:8080/tarefas'; // Ajuste para IP real se estiver testando no celular

export function TasksScreen() {
  const { theme } = useAppTheme();
  const [tarefas, setTarefas] = useState([]);
  const [nova_tarefa, setNovaTarefa] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);

  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 🔹 Buscar tarefas do backend
  const carregarTarefas = async () => {
  try {
    const res = await fetch(URL);
    const json = await res.json();
    console.log("Tarefas carregadas", json);
    const tarefasAdaptadas = json.map(tarefa => ({
      id: tarefa.id,
      texto: tarefa.nova_tarefa,          // <- nome esperado no front
      concluida: tarefa.concluida,
      data: tarefa.data_tarefa            // <- nome esperado no agrupamento
    }));

    setTarefas(tarefasAdaptadas);
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error.message);
  }
};

  useEffect(() => {
    carregarTarefas();
  }, []);

  // 🔹 Adicionar tarefa (envia ao backend)
    const adicionarTarefa = async () => {
    if (nova_tarefa.trim() === '') return;

    const nova = {
      nova_tarefa: nova_tarefa,
      concluida: false,
      data_tarefa: dataSelecionada.toISOString().split('T')[0], // "yyyy-MM-dd"
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
        carregarTarefas(); // Atualiza lista
      } else {
        Alert.alert('Erro', 'Falha ao adicionar tarefa');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na comunicação com o servidor');
    }
  };

  const toggleConcluida = (id) => {
    // Aqui seria ideal atualizar no backend também, mas mantendo apenas local por simplicidade
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  // 🔹 Remover tarefa (apenas local neste exemplo)
  const removerTarefa = (id) => {
    setTarefas((prev) => prev.filter((tarefa) => tarefa.id !== id));
    // Para remover do backend, seria necessário uma rota DELETE
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
        novaTarefa={nova_tarefa}
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