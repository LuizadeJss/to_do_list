import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { agruparTarefasPorData, formatDate, tituloData } from '../../utils/dateUtils';
import { TaskItem } from './TaskItem';
import { useAppTheme } from '../../context/ThemeContext';
import { styles } from '../../theme/styles';

import bgImage from '../../images/background.png';

export function TaskGroupList({ tarefas, onToggleComplete, onRemove }) {
  const { theme } = useAppTheme();

  const grupos = agruparTarefasPorData(tarefas);

  if (grupos.length === 0) {
    return (
      <View style={styles.emptyImageContainer}>
        <Image source={bgImage} style={styles.emptyImage} resizeMode="contain" />
      </View>
    );
  }

  return (
    <FlatList
      data={grupos}
      keyExtractor={(item) => item.dataKey}
      renderItem={({ item }) => (
        <View>
          <Text style={[styles.tituloGrupo, { color: theme.primary }]}>
            {tituloData(item.dataKey)}
          </Text>
          {item.tarefas.map((tarefa) => (
            <TaskItem 
              key={tarefa.id} 
              item={{
                id: tarefa.id,
                novaTarefa: tarefa.novaTarefa, 
                concluida: tarefa.concluida,
                dataTarefa: tarefa.dataTarefa,
              }}
              onToggleComplete={onToggleComplete}
              onRemove={onRemove}
            />
          ))}
        </View>
      )}
      contentContainerStyle={{ padding: 20 }}
    />
  );
}
