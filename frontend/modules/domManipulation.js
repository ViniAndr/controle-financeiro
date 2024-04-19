//is-invalid
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
