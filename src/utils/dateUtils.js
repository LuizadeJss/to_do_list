// 🔹 Formata uma string "yyyy-MM-dd" ou objeto Date para "dd/MM/yyyy"
export function formatDate(dateInput) {
  if (!dateInput) return '';

  let d = typeof dateInput === 'string' ? new Date(`${dateInput}T00:00:00`) : new Date(dateInput);
  
  if (isNaN(d)) return ''; // segurança contra datas inválidas

  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// 🔹 Agrupa tarefas por data (data em formato "yyyy-MM-dd" vindo do backend)
export function agruparTarefasPorData(tarefas) {
  const grupos = {};

  tarefas.forEach((tarefa) => {
    const key = tarefa.dataTarefa || tarefa.data; // compatibilidade
    if (!key) return;

    if (!grupos[key]) grupos[key] = [];
    grupos[key].push(tarefa);
  });

  const datasOrdenadas = Object.keys(grupos).sort((a, b) => new Date(a) - new Date(b));

  return datasOrdenadas.map((dataKey) => ({
    dataKey,
    tarefas: grupos[dataKey],
  }));
}

// 🔹 Define títulos de grupos: "HOJE", "AMANHÃ" ou data formatada
export function tituloData(dataISO) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);

  const data = new Date(`${dataISO}T00:00:00`);
  data.setHours(0, 0, 0, 0);

  if (data.getTime() === hoje.getTime()) return 'HOJE';
  if (data.getTime() === amanha.getTime()) return 'AMANHÃ';

  return formatDate(data);
}
