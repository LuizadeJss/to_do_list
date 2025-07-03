export function formatDate(date) {
  const d = new Date(date);
  if (isNaN(d)) return "Data inválida";

  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

export function agruparTarefasPorData(tarefas) {
  const grupos = {};

  tarefas.forEach((tarefa) => {
    const raw = tarefa.dataTarefa;

    // Ignora tarefas sem data
    if (!raw) return;

    const data = new Date(raw);
    if (isNaN(data)) return;

    const key = data.toISOString().split('T')[0];

    if (!grupos[key]) grupos[key] = [];
    grupos[key].push(tarefa);
  });

  const datasOrdenadas = Object.keys(grupos).sort((a, b) => new Date(a) - new Date(b));

  return datasOrdenadas.map((dataKey) => ({
    dataKey,
    tarefas: grupos[dataKey],
  }));
}
