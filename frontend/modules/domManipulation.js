import * as handler from "./dataHandler";
// Atributos do formulário de login e cadastro
export let emailInput, senhaInput, nameInput, checkboxInput;

// função responsável por associar os inputs do formulário
export function associarForm(form) {
  emailInput = form.querySelector('input[type="email"]');
  senhaInput = form.querySelector('input[type="password"]');
  nameInput = form.querySelector('input[type="text"]');
  checkboxInput = form.querySelector('input[type="checkbox"]');
}

// caso o input tem valor invlaido, ele ficará vermelho e com uma menssagem
export function inputInvalido(input) {
  input.classList.add("is-invalid");
  setTimeout(() => {
    input.classList.remove("is-invalid");
  }, 2000);
}

// criar um texto informando o erro abaixo do input
export function mostrarMensagemErro(input, mensagem) {
  const elPai = input.parentElement;
  const msg = document.createElement("div");
  msg.className = "form-text text-danger";

  msg.textContent = mensagem;

  elPai.appendChild(msg);
}

// responsável por remover a menssagem de erro abaixo do input
export function removeMsg() {
  const msgs = document.querySelectorAll(".form-text");
  msgs.forEach((msg) => {
    msg.remove();
  });
}

// breve saudação no frontend
function saudacaoHome() {
  const h1 = document.querySelector(".h1-saudacao");
  if (!h1) return;
  const nome = h1.getAttribute("_nome");
  const data = new Date();

  let saudacao;
  if (data.getHours() < 12) saudacao = "Bom dia";
  else if (data.getHours() < 18) saudacao = "Boa tarde";
  else if (data.getHours() < 24) saudacao = "Boa noite";
  else saudacao = "Boa madrugada";

  h1.textContent = `${saudacao} ${nome}`;
}

// resposável  por exibir dados formatados no frontend
function exibirValores() {
  handler.exibirElementos(".valor", "_valor", handler.formatarValor);
}

function exibirDatas() {
  handler.exibirElementos(".data", "_data", handler.formatarData);
}

function exibirCategorias() {
  handler.exibirElementos(".categoria", "_categoria", handler.LetrasMaiuscula);
}

// mostra o tipo decada lançamento com texto e imagem referente
function exibirTipos() {
  const tipos = document.querySelectorAll(".tipo-lan");
  tipos.forEach((el) => {
    const tipo = el.getAttribute("_tipoLan");
    const descricao = handler.LetrasMaiuscula(tipo);
    const imagem = tipo === "pagamento" ? "./assets/img/pagamento.png" : "./assets/img/despesa.png";

    el.innerHTML = `${descricao} <img src="${imagem}" alt="${descricao}" />`;
  });
}

// função resposável por chamar todas outras de exibição
export function init() {
  saudacaoHome();
  exibirDatas();
  exibirValores();
  exibirCategorias();
  exibirTipos();
  valorCards();
}
function valorCards() {
  const valores = document.querySelectorAll(".valor");
  const tipoLan = document.querySelectorAll(".tipo-lan");

  // recebo em array os valores calculados
  const valoresCalculados = handler.calcularValores(valores, tipoLan);

  // pego todos os cards e coloco o valor formatado
  const cardsEl = document.querySelectorAll(".card-valores");
  cardsEl.forEach((card, i) => {
    card.textContent = handler.formatarValor(valoresCalculados[i]);
  });
}
