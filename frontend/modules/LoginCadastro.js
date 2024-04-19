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

    dom.removeMsg();
    let error = false;

    if (dom.nameInput && dom.nameInput.value == "") {
      error = true;
      dom.inputInvalido(dom.nameInput);
    }

    if (!validator.isEmail(dom.emailInput.value)) {
      error = true;
      dom.inputInvalido(dom.emailInput);
    }

    if (dom.senhaInput.value.length < 8 || dom.senhaInput.value.length > 35) {
      error = true;
      dom.inputInvalido(dom.senhaInput);
    }

    if (!error) el.submit();
  }

  mostraSenha() {
    dom.checkboxInput.addEventListener("click", () => {
      if (dom.checkboxInput.checked == true) {
        dom.senhaInput.type = "text";
      } else {
        dom.senhaInput.type = "password";
      }
    });
  }
}
