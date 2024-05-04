const validator = require("validator");
import * as dom from "./domManipulation";

export default class LoginCadastro {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    if (!this.form) return;
    dom.associarForm(this.form);
    this.mostraSenha();
    this.event();
  }

  event() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validar(e);
    });
  }

  validar(e) {
    const el = e.target;
    // remover espaços em branco no começo e no fim
    const email = dom.emailInput.value.trim();
    const senha = dom.senhaInput.value.trim();

    dom.removeMsg();
    let error = false;

    if (dom.nameInput) {
      error = this.validarNome();
    }

    // Verifica se email é valido
    if (!validator.isEmail(email)) {
      error = true;
      dom.inputInvalido(dom.emailInput);
      dom.mostrarMensagemErro(dom.emailInput, "Email inválido.");
    }

    // senha é validada para ter o ranger esperado e não conter espaços em branco
    if (senha.length < 8 || senha.length > 35 || !/^[a-zA-Z0-9]+$/.test(senha)) {
      error = true;
      dom.inputInvalido(dom.senhaInput);
      dom.mostrarMensagemErro(dom.senhaInput, "Senha deve ter entre 8 e 35 caracteres válidos.");
    }

    if (!error) el.submit();
  }

  validarNome() {
    const nome = dom.nameInput.value.trim();
    // verifica se o campo nome está preenchido e se contem algum espaço no começo ou fim
    if (!/^[\p{L}\s]+$/u.test(nome) || nome.length < 2) {
      dom.inputInvalido(dom.nameInput);
      dom.mostrarMensagemErro(dom.nameInput, "Nome de usuário é invalido");
      return true;
    }
    return false;
  }

  mostraSenha() {
    dom.checkboxInput.addEventListener("click", () => {
      dom.senhaInput.type = dom.checkboxInput.checked ? "text" : "password";
    });
  }
}
