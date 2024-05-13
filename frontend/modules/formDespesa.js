import * as dom from "./domManipulation";

const inputValor = document.querySelector(".input-valor");
const inputData = document.querySelector(".input-data");
const selectCategoria = document.querySelector(".select-categoria");
const rdDespesa = document.querySelector("#rdDespesa");
const rdPagamento = document.querySelector("#rdPagamento");

const formDespesa = document.querySelector(".form-despesa");

export function formularioDespesa() {
  // se na página exibida não tiver o formulário de despesa, não executa o código
  if (!formDespesa) return;

  formDespesa.addEventListener("submit", async (e) => {
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

  // verifica tipo de lançamento
  if (rdDespesa.checked === false && rdPagamento.checked === false) {
    valido = false;
    dom.inputInvalido(rdDespesa);
    dom.inputInvalido(rdPagamento);
    dom.mostrarMensagemErro(rdPagamento, "Selecione se é Pagamento ou Despesa");
  }

  return valido;
}
