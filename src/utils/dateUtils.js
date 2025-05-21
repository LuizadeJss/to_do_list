// Funções para datas

// Função para formatar datas no formato dd/mm/aaaa
export function formatDate(date) {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// Função para agrupar tarefas por data
export function agruparTarefasPorData(tarefas) {
  // chave: string da data em yyyy-mm-dd para agrupar
  const grupos = {};

  tarefas.forEach((tarefa) => {
    const data = new Date(tarefa.data);
    const key = data.toISOString().split('T')[0]; // yyyy-mm-dd

    if (!grupos[key]) grupos[key] = [];
    grupos[key].push(tarefa);
  });

  // Ordenar as datas
  const datasOrdenadas = Object.keys(grupos).sort((a, b) => new Date(a) - new Date(b));

  return datasOrdenadas.map((dataKey) => ({
    dataKey,
    tarefas: grupos[dataKey],
  }));
}

// Função que mostra o título da seção conforme a data
export function tituloData(dataISO) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);

  const data = new Date(dataISO);
  data.setHours(0, 0, 0, 0);

  if (data.getTime() === hoje.getTime()) return 'HOJE';
  if (data.getTime() === amanha.getTime()) return 'AMANHÃ';

  return formatDate(data);
}