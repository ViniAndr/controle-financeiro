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
    try {
      this.validateCadastro();

      // verifica se usuário já existe pelo email
      const usuario = await LoginModel.findOne({ email: this.body.email });
      if (usuario) {
        throw new Error("Email já usado"); // Lançando erro para tratamento
      }

      // bcryptjs
      const salt = bcrypt.genSaltSync();
      this.body.password = bcrypt.hashSync(this.body.password, salt);

      // criar usuário
      this.user = await LoginModel.create(this.body);
    } catch (error) {
      this.errors.push(error.message);
    }
  }

  validateCadastro() {
    this.body.nome = this.body.nome.trim();
    // valida nome
    if (!/^[\p{L}\s]+$/u.test(this.body.nome) || this.body.nome.length < 2) {
      this.errors.push("Nome de usuário é invalido");
    }

    this.validarEmail();
    this.validarSenha();
  }

  async login() {
    try {
      this.validateLogin();

      // busca o usuario, verifica se existe e salva em this.user
      const usuario = await LoginModel.findOne({ email: this.body.email });
      if (!usuario) {
        throw new Error("Login invalido"); // Lançando erro para tratamento
      }
      this.user = usuario;

      //busquei os dados pelo email, Agora devo comparar as senhas

      // senha bate?
      if (!bcrypt.compareSync(this.body.password, usuario.password)) {
        throw new Error("Senha inválida."); // Lançando erro para tratamento
      }
    } catch (error) {
      this.errors.push(error.message);
      this.user = null; // Resetando o usuário em caso de erro
    }
  }

  validateLogin() {
    this.validarEmail();
    this.validarSenha();
  }

  validarEmail() {
    this.body.email = this.body.email.trim();
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Email invalido!");
    }
  }

  validarSenha() {
    this.body.password = this.body.password.trim();
    if (!/^[a-zA-Z0-9]+$/.test(this.body.password) || this.body.password.length < 8 || this.body.passwordlength > 35) {
      this.errors.push("A senha precisa ter entre 8 e 35 caracteres válidos.");
    }
  }
}

module.exports = Login;
