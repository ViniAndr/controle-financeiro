import { removeMsg, inputInvalido, mostrarMensagemErro } from "./domManipulation";

const inputValor = document.querySelector(".input-valor");
const inputData = document.querySelector(".input-data");
const selectCategoria = document.querySelector(".select-categoria");
const rdGasto = document.querySelector("#rdGasto");
const rdReceita = document.querySelector("#rdReceita");

const form = document.querySelector(".form-transacao");

export function formTransacao() {
  // se na página exibida não tiver o formulário de despesa, não executa o código
  if (!form) return;
  attCategoriasDinamicamente();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    removeMsg();
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
    inputInvalido(inputValor);
    mostrarMensagemErro(inputValor, "Insira um valor valido");
  }

  // verifica data
  if (data > new Date() || !inputData.value) {
    valido = false;
    inputInvalido(inputData);
    mostrarMensagemErro(inputData, "Data invalida!");
  }

  // verifica categoria
  if (selectCategoria.value === "Categorias") {
    valido = false;
    inputInvalido(selectCategoria);
    mostrarMensagemErro(selectCategoria, "Informe uma categoria valida");
  }

  // verifica tipo de transação
  if (rdGasto.checked === false && rdReceita.checked === false) {
    valido = false;
    inputInvalido(rdGasto);
    inputInvalido(rdReceita);
    mostrarMensagemErro(rdReceita, "Selecione se é receira ou Despesa");
  }

  return valido;
}

// Função que atualiza as categorias de acordo com o tipo de transação
function attCategoriasDinamicamente() {
  // pegar o valor do BD se for edit
  const valorCategoriaEdit = selectCategoria.getAttribute("_categoria");

  // categorias disponiveis
  const categorias = {
    receita: [
      { value: "salario", text: "Salário" },
      { value: "investimento", text: "Investimento" },
      { value: "outros", text: "Outros" },
    ],
    gasto: [
      { value: "contas", text: "Contas" },
      { value: "alimentacao", text: "Alimentação" },
      { value: "transporte", text: "Transporte" },
      { value: "outros", text: "Outros" },
    ],
  };

  function atualizarCategorias(tipo) {
    selectCategoria.textContent = "";

    categorias[tipo].forEach((categoria) => {
      const option = document.createElement("option");
      option.value = categoria.value;
      option.textContent = categoria.text;
      selectCategoria.appendChild(option);

      // selecionar a categoria certa caso venha de editar
      if (valorCategoriaEdit === categoria.value) {
        option.selected = true;
      }
    });
  }

  // verifica se o radio foi marcado e chama a função de atualizar
  rdReceita.addEventListener("change", () => {
    if (rdReceita.checked) atualizarCategorias("receita");
  });
  // verifica se o radio foi marcado e chama a função de atualizar
  rdGasto.addEventListener("change", () => {
    if (rdGasto.checked) atualizarCategorias("gasto");
  });

  // Verifica qual radio está marcado quando for editar
  if (rdReceita.checked) {
    atualizarCategorias("receita");
  } else if (rdGasto.checked) {
    atualizarCategorias("gasto");
  }
}
