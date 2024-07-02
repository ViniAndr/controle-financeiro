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
  msg.className = "form-text text-danger";
  msg.textContent = mensagem;
  elPai.appendChild(msg);
}

// responsável por remover a mensagem de erro abaixo do input
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

// mostra o tipo de cada lançamento com texto e imagem referente
function exibirTipos() {
  const tipos = document.querySelectorAll(".tipo-tran");
  tipos.forEach((el) => {
    const tipo = el.getAttribute("_tipotran");
    const descricao = handler.LetrasMaiuscula(tipo);
    const imagem = tipo === "receita" ? "./assets/img/pagamento.png" : "./assets/img/despesa.png";

    el.innerHTML = `${descricao} <img src="${imagem}" alt="${descricao}" />`;
  });
}

// função responsável por chamar todas outras de exibição
export function init() {
  saudacaoHome();
  exibirDatas();
  exibirValores();
  exibirCategorias();
  exibirTipos();
  valorCards();
  atualizarCategoriasDinamicamente();
}

function valorCards() {
  const valores = document.querySelectorAll(".valor");
  const tipotTansacao = document.querySelectorAll(".tipo-tran");

  // recebo em array os valores calculados
  const valoresCalculados = handler.calcularValores(valores, tipotTansacao);

  // pego todos os cards e coloco o valor formatado
  const cardsEl = document.querySelectorAll(".card-valor");
  cardsEl.forEach((card, i) => {
    card.textContent = handler.formatarValor(valoresCalculados[i]);
  });
}

// função para atualizar dinamicamente as categorias com base no tipo de transação
function atualizarCategoriasDinamicamente() {
  const rdReceita = document.getElementById('rdReceita');
  const rdDespesa = document.getElementById('rdDespesa');
  const selectCategoria = document.getElementById('selectCategoria');

  
  // finalizar a função caso algum dos elementos não exista (pagina diferente)
  if (!rdReceita || !rdDespesa || !selectCategoria) return;

  const valorCategoriaEdit = selectCategoria.getAttribute('_categoria');

  const categoriasReceita = [
    { value: 'salario', text: 'Salário' },
    { value: 'investimento', text: 'Investimento' },
    { value: 'outros', text: 'Outros' }
  ];

  const categoriasDespesa = [
    { value: 'contas', text: 'Contas' },
    { value: 'alimentacao', text: 'Alimentação' },
    { value: 'transporte', text: 'Transporte' },
    { value: 'outros', text: 'Outros' }
  ];

  function atualizarCategorias(categorias) {
    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria.value;
      option.textContent = categoria.text;
      selectCategoria.appendChild(option);

      // selecionar a categoria certa caso venha de editar
      if (valorCategoriaEdit === categoria.value) {
        option.selected = true;
      }
    });
  }

  rdReceita.addEventListener('change', () => {
    if (rdReceita.checked) {
      selectCategoria.innerHTML = '';
      atualizarCategorias(categoriasReceita);
    }
  });

  rdDespesa.addEventListener('change', () => {
    if (rdDespesa.checked) {
      selectCategoria.innerHTML = '';
      atualizarCategorias(categoriasDespesa);
    }
  });

  // Verifica qual radio está marcado ao carregar a página
  if (rdReceita.checked) {
    atualizarCategorias(categoriasReceita);
  } else if (rdDespesa.checked) {
    atualizarCategorias(categoriasDespesa);
  }
}
