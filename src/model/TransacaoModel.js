const mongoose = require("mongoose");

const transacaoSchema = mongoose.Schema({
  valor: { type: Number, require: true },
  data: { type: Date, default: Date.now, require: true },
  categoria: { type: String, require: true },
  tipoLancamento: { type: String, enum: ["pagamento", "despesa"], require: true },
});

const TransacaoModel = mongoose.model("Transacao", transacaoSchema);

function Transacao(body) {
  this.body = body;
  this.errors = [];
  this.transacao = null;
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
  // verfica se algum dos tipos de lançamento está marcado.
  if (!this.body.tipoLancamento) {
    this.errors.push("Selecione se é Pagamento ou Despesa");
  }
};

// foi protoipado para usar o método valida()
Transacao.prototype.edit = async function (id) {
  // se não tiver o id
  if (typeof id !== "string") return;
  // se não for validado
  this.validar();
  // se tiver erro
  if (this.errors.length > 0) return;

  // atualiza o contato
  this.transacao = await TransacaoModel.findByIdAndUpdate(id, this.body, {
    // retorna o novo contato,  e não os dados antigos
    new: true,
  });
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

Transacao.buscarPorId = async function (id) {
  if (typeof id !== "string") return;
  const transacao = await TransacaoModel.findById(id);
  return transacao;
};

Transacao.delete = async function (id) {
  if (typeof id !== "string") return;
  const transacao = await TransacaoModel.findOneAndDelete({ _id: id });
  return transacao;
};

module.exports = Transacao;
