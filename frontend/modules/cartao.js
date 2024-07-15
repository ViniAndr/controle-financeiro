import * as handler from "./dataHandler";

// parte reservado para página de cartãoIndex
function exibirCardsFatura() {
  const cartoes = document.querySelectorAll(".card-credito");
  if (!cartoes || cartoes.length == 0) return; // finalizar a função caso não exista cartẽos

  // variaveis de soma
  let valorTotalFaturas = 0;
  let LimiteTotal = 0;

  cartoes.forEach((cartao) => {
    // atributos das faturas
    const valorFatura = cartao.querySelector(".valor-fatura");
    const dataVencimento = cartao.querySelector(".data-vencimento");
    const limiteCredito = cartao.querySelector(".limite-credito");

    const valor = handler.formatarValor(valorFatura.getAttribute("_valor"));
    valorFatura.textContent = valor;

    const limite = handler.formatarValor(limiteCredito.getAttribute("_limite"));
    limiteCredito.textContent = limite;

    // tem um "false" como argumento é para formatar a data no formato "xx do mês de xxxx"
    const vencimento = handler.formatarData(dataVencimento.getAttribute("_data"), false);
    dataVencimento.textContent = vencimento;

    verificarFaturaAtrasada(cartao, dataVencimento.getAttribute("_data"));

    // somar o valor das faturas
    valorTotalFaturas += parseFloat(valorFatura.getAttribute("_valor"));
    LimiteTotal += parseFloat(limiteCredito.getAttribute("_limite"));
  });

  function verificarFaturaAtrasada(cartao, data) {
    const tituloFatura = cartao.querySelector(".titulo-fatura");
    const cabecarioCard = cartao.querySelector(".card-header");
    const btnCard = cartao.querySelector(".btn");

    // Converter a data de vencimento do banco de dados para o fuso horário local
    const dataVencimentoUTC = new Date(data);
    const dataVencimentoLocal = new Date(
      dataVencimentoUTC.getTime() + dataVencimentoUTC.getTimezoneOffset() * 60 * 1000
    );

    const dataHoje = new Date();
    // setar os horarios para os mesmos para fazer a comparação
    dataHoje.setHours(0, 0, 0, 0);
    dataVencimentoLocal.setHours(0, 0, 0, 0);

    if (dataVencimentoLocal >= dataHoje) {
      tituloFatura.textContent = "Fatura aberta";
    } else {
      const cor = "#ff6f61";
      tituloFatura.textContent = "Fatura vencida";
      tituloFatura.style.removeProperty("color");
      tituloFatura.style.color = cor;

      cabecarioCard.style.removeProperty("background-color");
      cabecarioCard.style.backgroundColor = cor;

      btnCard.style.removeProperty("background-color");
      btnCard.style.backgroundColor = cor;
    }
  }

  // soma dos valores no front
  valorTotalDasFaturas(valorTotalFaturas);
  limiteTotalDeCredito(LimiteTotal);
}

function valorTotalDasFaturas(valorTotal) {
  const valoresFaturas = document.querySelector("#valor-faturas");
  valoresFaturas.textContent = handler.formatarValor(valorTotal);
}

function limiteTotalDeCredito(LimiteTotal) {
  const limiteTotal = document.querySelector("#limite-total");
  limiteTotal.textContent = handler.formatarValor(LimiteTotal);
}

// função para exibir os cartões no select de criar transação
export async function ExibirCartoesNoSelect() {
  const form = document.querySelector(".form-transacao-fatura");
  if (!form) return;

  const selectCartao = document.getElementById("selectCartao");

  // para receber os cartoes do BD
  const dados = form.getAttribute("_dados");

  try {
    const dadosArray = JSON.parse(dados);

    if (Array.isArray(dadosArray) && dadosArray.length > 0) {
      dadosArray.forEach((cartao) => {
        selectCartao.innerHTML += `<option value="${cartao._id}">${cartao.nome}</option>`;
      });
    } else {
      throw new Error("Dados não estão no formato esperado");
    }
  } catch (error) {
    console.error("Erro ao processar dados:", error);
  }
}

export function carregarConteudo() {
  const inputMes = document.getElementById("inputMes");
  if (!inputMes) return;

  inputMes.value = handler.dataAtual(false);
  buscarfaturas(inputMes.value);

  inputMes.addEventListener("change", (e) => {
    buscarfaturas(e.target.value);
  });
}

function buscarfaturas(mes) {
  fetch("/cartao", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mes }),
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("area-cartoes").innerHTML = data;
      exibirCardsFatura();
    })
    .catch((error) => {
      console.error("Error loading content:", error);
    });
}
