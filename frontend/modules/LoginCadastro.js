const validator = require("validator");
import { removeMsg, inputInvalido, mostrarMensagemErro } from "./domManipulation";

export default class LoginCadastro {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
    this.emailInput = null;
    this.senhaInput = null;
    this.nameInput = null;
    this.checkboxInput = null;
  }

  init() {
    if (!this.form) return;
    this.associarForm(this.form);
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
    const email = this.emailInput.value.trim();
    const senha = this.senhaInput.value.trim();

    removeMsg();
    let error = false;

    if (this.nameInput) {
      error = this.validarNome();
    }

    // Verifica se email é valido
    if (!validator.isEmail(email)) {
      error = true;
      inputInvalido(this.emailInput);
      mostrarMensagemErro(this.emailInput, "Email inválido.");
    }

    // senha é validada para ter o ranger esperado e não conter espaços em branco
    if (senha.length < 8 || senha.length > 35 || !/^[a-zA-Z0-9]+$/.test(senha)) {
      error = true;
      inputInvalido(this.senhaInput);
      mostrarMensagemErro(this.senhaInput, "Senha deve ter entre 8 e 35 caracteres válidos.");
    }

    if (!error) el.submit();
  }

  validarNome() {
    const nome = this.nameInput.value.trim();
    // verifica se o campo nome está preenchido e se contem algum espaço no começo ou fim
    if (!/^[\p{L}\s]+$/u.test(nome) || nome.length < 2) {
      inputInvalido(this.nameInput);
      mostrarMensagemErro(this.nameInput, "Nome de usuário é invalido");
      return true;
    }
    return false;
  }

  // função responsável por associar os inputs do formulário
  associarForm(form) {
    this.emailInput = form.querySelector('input[type="email"]');
    this.senhaInput = form.querySelector('input[type="password"]');
    this.nameInput = form.querySelector('input[type="text"]');
    this.checkboxInput = form.querySelector('input[type="checkbox"]');
  }
}
