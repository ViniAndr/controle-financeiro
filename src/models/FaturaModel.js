const mongoose = require("mongoose");

const FaturaSchema = mongoose.Schema({
  cartaoId: { type: mongoose.Schema.Types.ObjectId, ref: "Cartao", required: true }, // Referência ao ID do cartão
  valor: { type: Number, required: true },
  // Formato YYYY-MM
  mesReferencia: { type: String, required: true },
  status: { type: String, enum: ["pago", "aberta", "fechada"], required: true },
  dataVencimento: { type: Date, required: true },
});

const FaturaModel = mongoose.model("Fatura", FaturaSchema);

class Fatura {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.fatura = null;
  }

  // Função responsável por registrar uma nova fatura
  async register() {
    this.validar();
    if (this.errors.length > 0) return;

    this.formatarValores(this.body.valor);

    this.fatura = await FaturaModel.create(this.body);
  }

  // Validação dos campos da fatura
  validar() {
    if (!this.body.cartaoId) {
      this.errors.push("Preencha com um ID válido para o cartão");
    }

    if (!this.body.valor || this.body.valor < 0) {
      this.errors.push("Insira um valor válido");
    }

    if (!this.body.mesReferencia) {
      this.errors.push("Preencha o mês de referência");
    }

    if (!this.body.dataVencimento) {
      this.errors.push("Preencha a data de vencimento");
    }

    if (!this.body.status || !["pago", "aberta", "fechada"].includes(this.body.status)) {
      this.errors.push("Preencha com um status válido");
    }
  }

  // Formatação de valores para envio ao banco de dados
  formatarValores(valor) {
    if (typeof valor === "string") {
      valor = parseFloat(valor).toFixed(2);
    }
    this.body.valor = valor;
  }

  // recupera a fatura de algum cartão pelo mês de referência
  static async recuperarFaturaPorMes(cartaoId, mesReferencia) {
    try {
      const fatura = await FaturaModel.findOne({ cartaoId, mesReferencia });
      return fatura;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = { Fatura, FaturaModel };
