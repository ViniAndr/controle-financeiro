export function formatarData(dataDb, timeZone = "UTC") {
  const data = new Date(dataDb);
  data.setTime(data.getTime() + data.getTimezoneOffset() * 60 * 1000); // Ajuste para o fuso horário local
  const dia = data.getDate();
  const mes = data.getMonth() + 1; // Os meses começam em zero, por isso é necessário adicionar +1
  const ano = data.getFullYear();

  // Função para adicionar um zero à esquerda se o valor for menor que 10
  const adicionarZeroEsquerda = (valor) => (valor < 10 ? `0${valor}` : valor);

  // Formatação da data no formato "dd/mm/aaaa"
  const dataFormatada = `${adicionarZeroEsquerda(dia)}/${adicionarZeroEsquerda(mes)}/${ano}`;

  return dataFormatada;
}

export function formatarValor(valor) {
  let valorFloat = 0;

  // Verifica se o valor é uma string numérica ou um número
  if (typeof valor === "string" || typeof valor === "number") {
    valorFloat = parseFloat(valor);
  }

  // Formata o valor com duas casas decimais
  const valorFormatado = valorFloat.toFixed(2);

  // Adiciona o prefixo "R$" ao valor formatado
  return `R$ ${valorFormatado}`;
}
