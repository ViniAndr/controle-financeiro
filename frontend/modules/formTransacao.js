import * as dom from "./domManipulation";

const inputValor = document.querySelector(".input-valor");
const inputData = document.querySelector(".input-data");
const selectCategoria = document.querySelector(".select-categoria");
const rdGasto = document.querySelector("#rdGasto");
const rdPagamento = document.querySelector("#rdReceita");

const form = document.querySelector(".form-transacao");

export function formTransacao() {
  // se na página exibida não tiver o formulário de despesa, não executa o código
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    dom.removeMsg();
    const valido = validar();
    if (valido) formDespesa.submit();
  });
}

function validar() {
  const data = new Date(inputData.value);
  let valido = true;

  // verifica valor
  if (inputValor.value < 1) {
    valido = false;
    dom.inputInvalido(inputValor);
    dom.mostrarMensagemErro(inputValor, "Insira um valor valido");
  }

  // verifica data
  if (data > new Date() || !inputData.value) {
    valido = false;
    dom.inputInvalido(inputData);
    dom.mostrarMensagemErro(inputData, "Data invalida!");
  }

  // verifica categoria
  if (selectCategoria.value === "Categorias") {
    valido = false;
    dom.inputInvalido(selectCategoria);
    dom.mostrarMensagemErro(selectCategoria, "Informe uma categoria valida");
  }

  // verifica tipo de transação
  if (rdGasto.checked === false && rdPagamento.checked === false) {
    valido = false;
    dom.inputInvalido(rdGasto);
    dom.inputInvalido(rdPagamento);
    dom.mostrarMensagemErro(rdPagamento, "Selecione se é receira ou Despesa");
  }

  return valido;
}
