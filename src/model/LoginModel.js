const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

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
    this.validaCadastro();
    if (this.errors.length > 0) return;

    // verifica se usuário já existe pelo email
    await LoginModel.findOne({ email: this.body.email }).then((usuario) => {
      if (usuario) this.errors.push("Email já usado");
    });
    if (this.errors.length > 0) return;

    // bcryptjs
    const salt = bcrypt.genSaltSync();
    this.body.password = bcrypt.hashSync(this.body.password, salt);

    // criar usuário
    this.user = await LoginModel.create(this.body);
  }

  validaCadastro() {
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

  async login() {
    this.validaLogin();
    if (this.errors.length > 0) return;

    // busca o usuario, verifica se existe e salva em this.user
    await LoginModel.findOne({ email: this.body.email }).then((usuario) => {
      if (!usuario) {
        this.errors.push("Login invalido");
        return;
      }
      this.user = usuario;
    });

    //busquei os dados pelo email, Agora devo comparar as senhas

    // senha bate?
    if (!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Senha inválida.");
      // reset de usuario
      this.user = null;
      return;
    }
  }

  validaLogin() {
    this.clearUp();
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
