const mongoose = require("mongoose");
const validator = require("validator");

const LoginSchema = mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model("Usuario", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;

    // verifica se usuário já existe pelo email
    await LoginModel.findOne({ email: this.body.email }).then((usuario) => {
      if (usuario) this.errors.push("Email já usado");
    });
    if (this.errors.length > 0) return;

    // criar usuário
    this.user = await LoginModel.create(this.body);
  }

  valida() {
    this.clearUp();
    if (!this.body.nome) {
      this.errors.push("Nome é obrigatorio");
    }
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Email invalido!");
    }
    if (this.body.password.length < 8 || this.body.password.length > 35) {
      this.errors.push("A senha precisa ter entre 8 e 35 caracteres.");
    }
  }

  clearUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      nome: this.body.nome,
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Login;
