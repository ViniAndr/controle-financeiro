const mongoose = require("mongoose");

const transacaoSchema = mongoose.Schema({
  valor: { type: Number, require: true },
  data: { type: Date, default: Date.now, require: true },
  categoria: { type: String, require: true },
  tipoLancamento: { type: String, enum: ["entrada", "saida"], require: true },
});

const TransacaoModel = mongoose.model("Transacao", transacaoSchema);

function Transacao(body) {
  this.body = body;
  this.errors = [];
}
// função responsável por fazer o registro
Transacao.prototype.register = async function () {
  this.validar();
  if (this.errors.length > 0) return;

  this.fomatarValor();

  await TransacaoModel.create(this.body);
};

// responsável por fazer a validação do lado do servidor
Transacao.prototype.validar = function () {
  const dataNow = new Date();

  // Verifica se o campo 'data' está no futuro
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
};

// responsável por fazer a formatação dos valores antes do envio
Transacao.prototype.fomatarValor = function () {
  // Verifica se o campo 'valor' existe e é uma string
  if (typeof this.body.valor === "string") {
    // Converte a string para um número de ponto flutuante
    const valorFloat = parseFloat(this.body.valor);

    // Formata com duas casas decimais
    this.body.valor = valorFloat.toFixed(2);
  }
};

// método estático
Transacao.buscarTransicoes = async function () {
  const transacoes = await TransacaoModel.find();
  return transacoes;
};

module.exports = Transacao;
