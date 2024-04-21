const mongoose = require("mongoose");

const trasacaoSchema = mongoose.Schema({
  valor: { type: Number, require: true },
  data: { type: Date, default: Date.now, require: true },
  categoria: { type: String, require: true },
  tipo: { type: String, enum: ["entrada", "saida"], require: true },
});

const trasacaoModel = mongoose.model("Transacao", trasacaoSchema);

class Transacao {
  constructor(body) {
    this.body = body;
    this.errors = [];
  }

  validar() {
    // é necessario para verificar se a informada está no futuro.
    const dataNow = new Date();
    if (this.body.data) this.body.data = new Date(this.body.data);

    // verifica valor
    if (!this.body.valor || this.body.valor < 1) {
      this.errors.push("Insira um valor valido");
    }

    // verifica data
    if (!this.body.data || this.body.data > dataNow) {
      this.errors.push("Data invalida!");
    }

    // verifica a categoria
    if (this.body.categoria == "Categorias") {
      this.errors.push("Informe uma categoria valida");
    }
  }
}

module.exports = Transacao;
