import { homeInit } from "./home";
import * as cartao from "./cartao";
// importo aqui para se aproveitar do uso do DOMContentLoaded
import { formTransacao } from "./formTransacao";

// função responsável por chamar todas outras de exibição
export function init() {
  homeInit();
  mostrarSenha();
  removerAlerta();
}

document.addEventListener("DOMContentLoaded", () => {
  // Funcionalidade par ao form de Adicionar/editar Transação na HOME
  formTransacao();

  // Exibir os cartões no select de criar transação para fatura
  cartao.ExibirCartoesNoSelect();
  // Buscar no BD as faturas do mês atual e mostar na tela index:cartao
  cartao.carregarConteudo();

  modalOnOff();
});

// caso o input tenha valor inválido, ele ficará vermelho e com uma mensagem
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
  msg.className = "msg-erro text-danger";
  msg.textContent = mensagem;
  elPai.appendChild(msg);
}

// responsável por remover a mensagem de erro abaixo do input
export function removeMsg() {
  const msgs = document.querySelectorAll(".msg-erro");
  msgs.forEach((msg) => {
    msg.remove();
  });
}

// aplicado no login e creação de conta
function mostrarSenha() {
  const checkbox = document.querySelector(".checkbox-mostraSenha");
  const inputSenha = document.querySelector(".input-senha");

  // finalizar a função caso não exista os elementos
  if (!checkbox || !inputSenha) return;

  checkbox.addEventListener("click", () => {
    if (inputSenha.type === "password") {
      inputSenha.type = "text";
    } else {
      inputSenha.type = "password";
    }
  });
}

// remover a flash message que o back emite após 3 segundos
function removerAlerta() {
  const alerta = document.querySelector(".alert");
  setTimeout(() => {
    if (alerta) alerta.remove();
  }, 3000);
}

// função para exibir o filtro de mês
function modalOnOff() {
  // Abri filtro de mês
  const btnAbriModal = document.getElementById("btn-modal");
  if (!btnAbriModal) return;

  // esse modal-fundo é uma div que fica por fora do modal para centralizar o modal-content
  const modalFundo = document.getElementById("modal-fundo");
  const closeBtn = document.querySelector(".close-btn");

  // abri o modal
  btnAbriModal.addEventListener("click", () => {
    modalFundo.style.display = "block";
  });

  // fecha o modal
  closeBtn.addEventListener("click", () => {
    modalFundo.style.display = "none";
  });

  // fecha o modal ao clicar fora dele
  window.addEventListener("click", (event) => {
    // filterModal Não é o modal em si, so uma div que fica por fora para centrarlizar o modal(modal-content) de fato.
    if (event.target === modalFundo) {
      modalFundo.style.display = "none";
    }
  });
}
