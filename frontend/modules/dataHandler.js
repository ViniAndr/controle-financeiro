export function formatarData(dataDB, formatoPadrao = true) {
  const data = new Date(dataDB);
  // Ajuste para o fuso horário local
  data.setTime(data.getTime() + data.getTimezoneOffset() * 60 * 1000);
  const dia = data.getDate();
  // Os meses começam em zero, por isso é necessário adicionar +1
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();

  // Função para adicionar um zero à esquerda se o valor for menor que 10
  const adicionarZeroEsquerda = (valor) => (valor < 10 ? `0${valor}` : valor);

  if (formatoPadrao) {
    // Formatação da data no formato "dd/mm/aaaa"
    return `${adicionarZeroEsquerda(dia)}/${adicionarZeroEsquerda(mes)}/${ano}`;
  } else {
    // Fomatação da data no formato "xx do mês de xxxx"
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return `${adicionarZeroEsquerda(dia)} de ${meses[mes - 1]} de ${ano}`;
  }
}

// formata valores em R$
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

export function LetrasMaiuscula(palavra) {
  return palavra.toUpperCase();
}

export function exibirElementos(selector, atributo, formatar) {
  const elementos = document.querySelectorAll(selector);
  elementos.forEach((el) => {
    const valor = el.getAttribute(atributo);
    el.textContent = formatar(valor);
  });
}

// Calcula os valores de receitas, despesas e balanço da HOME
export function calcularValores(seletorValor, seletorTipo) {
  // Array para armazenar os valores de pagamento, despesa e balanço
  let valores = [0, 0, 0];

  seletorValor.forEach((valor, i) => {
    // Obtém o tipo de lançamento do elemento pela posição do valor
    const tipo = seletorTipo[i].getAttribute("_tipotran");

    // Obtém o valor do elemento sem o R$ e converte para número
    const num = Number(valor.textContent.split(" ").pop());

    // Adiciona o valor ao tipo de lançamento correspondente
    if (tipo == "receita") {
      valores[0] += num;
    } else {
      valores[1] += num;
    }
  });

  // Calcula o balanço subtraindo o valor de pagamentos do valor de despesas
  valores[2] = valores[0] - valores[1];
  return valores;
}

export function dataAtual(formatoPadrao = true) {
  const data = new Date();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();

  const adicionarZeroEsquerda = (valor) => (valor < 10 ? `0${valor}` : valor);

  if (formatoPadrao) {
    const dia = data.getDate();
    return `${ano}-${mes}-${dia}`;
  } else {
    return `${ano}-${adicionarZeroEsquerda(mes)}`;
  }
}
