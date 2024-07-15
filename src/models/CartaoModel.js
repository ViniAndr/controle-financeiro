const mongoose = require("mongoose");
const TransacaoFatura = require("./TransacaoFaturaModel");

const CartaoSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  nome: { type: String, required: true },
  limite: { type: Number, required: true },
  // Dia do mês em que a fatura fecha
  diaFechamento: { type: Number, required: true },
  // Dia do mês em que a fatura vence
  diaVencimento: { type: Number, required: true },
});

const CartaoModel = mongoose.model("Cartao", CartaoSchema);

class Cartao {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.cartao = null;
  }

  // Função responsável por registrar um novo cartão
  async registrarCartao() {
    this.validar();

    if (this.errors.length > 0) return;

    await CartaoModel.create(this.body);
  }

  // Validação dos campos do cartão
  validar() {
    if (!this.body.userId) {
      this.errors.push("Preencha com um ID válido para o usuário");
    }

    if (!this.body.nome) {
      this.errors.push("Preencha com um nome válido para o cartão");
    }

    if (!this.body.limite || this.body.limite < 1) {
      this.errors.push("Insira um limite válido");
    }

    if (!this.body.diaFechamento || this.body.diaFechamento < 1 || this.body.diaFechamento > 31) {
      this.errors.push("Insira um dia de fechamento válido");
    }

    if (!this.body.diaVencimento || this.body.diaVencimento < 1 || this.body.diaVencimento > 31) {
      this.errors.push("Insira um dia de vencimento válido");
    }
  }

  // Recuperar cartões de um usuário específico, usado na Index de cartão
  static async recuperarCartoes(userId) {
    const cartoes = await CartaoModel.find({ userId }).populate("userId");
    return cartoes;
  }

  // Recuperar um cartão específico por ID
  static async recuperarCartaoPorId(cartaoId) {
    const cartao = await CartaoModel.findById(cartaoId);
    return cartao;
  }

  // Calcular o limite disponível de um cartão específico para um mês de referência
  static async calcularLimiteDisponivel(cartaoId, mesReferencia) {
    const cartao = await CartaoModel.findById(cartaoId);

    if (!cartao) {
      throw new Error("Cartão não encontrado");
    }

    const valorFatura = await TransacaoFatura.calcularFatura(cartaoId, mesReferencia);
    return cartao.limite - valorFatura;
  }
}

module.exports = Cartao;
