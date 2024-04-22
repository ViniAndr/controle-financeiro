import { formatarValor, formatarData } from "./dataHandler";
export let emailInput, senhaInput, nameInput, checkboxInput;

export function associarForm(form) {
  emailInput = form.querySelector('input[type="email"]');
  senhaInput = form.querySelector('input[type="password"]');
  nameInput = form.querySelector('input[type="text"]');
  checkboxInput = form.querySelector('input[type="checkbox"]');
}

export function inputInvalido(input) {
  input.classList.add("is-invalid");
  msgErro(input);
  setTimeout(() => {
    input.classList.remove("is-invalid");
  }, 2000);
}

function msgErro(input) {
  const elPai = input.parentElement;
  const msg = document.createElement("div");
  msg.className = "form-text text-danger";

  if (input.type == "text") msg.textContent = "Nome invalido";
  else if (input.type == "email") msg.textContent = "Email invalido";
  else if (input.type == "password") msg.textContent = "Senha invalido";

  elPai.appendChild(msg);
}

export function removeMsg() {
  const msgs = document.querySelectorAll(".form-text");
  msgs.forEach((msg) => {
    msg.remove();
  });
}

export function saudacaoHome() {
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

export function exibirElementos(selector, atributo, formato) {
  const elementos = document.querySelectorAll(selector);
  elementos.forEach((el) => {
    const valor = el.getAttribute(atributo);
    el.textContent = formato(valor);
  });
}

export function exibirValores() {
  exibirElementos(".valor", "_valor", formatarValor);
}

export function exibirDatas() {
  exibirElementos(".data", "_data", formatarData);
}

export function exibirTipos() {
  const tipos = document.querySelectorAll(".tipo-lan");
  tipos.forEach((el) => {
    const tipo = el.getAttribute("_tipoLan");
    const descricao = tipo === "entrada" ? "Pagamento" : "Despesa";
    const imagem = tipo === "entrada" ? "./assets/img/pagamento.png" : "./assets/img/despesa.png";

    el.innerHTML = `${descricao} <img src="${imagem}" alt="${descricao}" />`;
  });
}
