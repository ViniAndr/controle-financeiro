import * as handler from "./dataHandler";

export function homeInit() {
  const h1 = document.querySelector(".h1-saudacao");
  if (!h1) return;
  saudacaoHome(h1);
  exibirValores();
  exibirDatas();
  exibirCategorias();
  exibirTipos();
  valorCards();
}

// breve saudação no frontend
function saudacaoHome(h1) {
  const nome = h1.getAttribute("_nome");
  const data = new Date();

  let saudacao;
  if (data.getHours() < 12) saudacao = "Bom dia";
  else if (data.getHours() < 18) saudacao = "Boa tarde";
  else if (data.getHours() < 24) saudacao = "Boa noite";
  else saudacao = "Boa madrugada";

  h1.textContent = `${saudacao} ${nome}`;
}

// responsável por exibir dados formatados no frontend
function exibirValores() {
  handler.exibirElementos(".valor", "_valor", handler.formatarValor);
}

function exibirDatas() {
  handler.exibirElementos(".data", "_data", handler.formatarData);
}

function exibirCategorias() {
  handler.exibirElementos(".categoria", "_categoria", handler.LetrasMaiuscula);
}

// mostra o tipo de cada transação com texto e imagem referente
function exibirTipos() {
  const tipos = document.querySelectorAll(".tipo-tran");
  tipos.forEach((el) => {
    const tipo = el.getAttribute("_tipotran");
    const descricao = handler.LetrasMaiuscula(tipo);
    const imagem = tipo === "receita" ? "./assets/img/pagamento.png" : "./assets/img/despesa.png";

    el.innerHTML = `${descricao} <img src="${imagem}" alt="${descricao}" />`;
  });
}

function valorCards() {
  const valores = document.querySelectorAll(".valor");
  if (!valores || valores.length == 0) return; // finalizar a função caso não exista valores
  const tipotTansacao = document.querySelectorAll(".tipo-tran");

  // recebo em array os valores calculados
  const valoresCalculados = handler.calcularValores(valores, tipotTansacao);

  // pego todos os cards e coloco o valor formatado
  const cardsEl = document.querySelectorAll(".card-valor");
  cardsEl.forEach((card, i) => {
    card.textContent = handler.formatarValor(valoresCalculados[i]);
  });
}
