//Formata uma data no formato dd/MM/yyyy
export function formatDate(date) {
  const d = new Date(date);
  if (isNaN(d)) return "Data inválida";

  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

//Agrupa tarefas por data da tarefa
export function agruparTarefasPorData(tarefas) {
  const grupos = {};

  tarefas.forEach((tarefa) => {
    const rawData = tarefa.dataTarefa;
    const data = new Date(rawData);

    // ignora tarefas com data inválida
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

//título do grupo de tarefas conforme a data
export function tituloData(dataISO) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);

  const data = new Date(dataISO);
  data.setHours(0, 0, 0, 0);

  if (data.getTime() === hoje.getTime()) return 'Hoje';
  if (data.getTime() === amanha.getTime()) return 'Amanhã';

  return formatDate(data);
}
