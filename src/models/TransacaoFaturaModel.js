const mongoose = require("mongoose");
const { Fatura, FaturaModel } = require("./FaturaModel");

const TransacaoFaturaSchema = mongoose.Schema({
  cartaoId: { type: mongoose.Schema.Types.ObjectId, ref: "Cartao", required: true },
  faturaId: { type: mongoose.Schema.Types.ObjectId, ref: "Fatura", required: true },
  descricao: { type: String, required: true },
  categoria: { type: String, required: true },
  valor: { type: Number, required: true },
  data: { type: Date, required: true },
  parcelas: { type: Number, required: true },
  parcelaAtual: { type: Number, required: true },
  // Formato YYYY-MM
  mesReferencia: { type: String, required: true },
});

const TransacaoFaturaModel = mongoose.model("TransacaoFatura", TransacaoFaturaSchema);

class TransacaoFatura {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.transacao = null;
  }

  // Função responsável por registrar uma nova transação parcelada
  async registrarTransacao() {
    // etapa de validação
    this.validar();
    if (this.errors.length > 0) return;

    // etapa de receber os dados e fazer algumas operações basica
    const { cartaoId, descricao, categoria, valor, data, parcelas, diaVencimento } = this.body;
    const valorParcela = valor / parcelas;
    // data que será inclusa por transação na fatura
    let currentDate = new Date(data);

    // para cada parcela
    for (let i = 0; i < parcelas; i++) {
      // pegaremos apenas o mês e ano por parcela
      const mesReferencia = currentDate.toISOString().slice(0, 7);

      // procuro pela fatura do cartão e mês de referencia para fazer atualizações
      let fatura = await Fatura.recuperarFaturaPorMes(cartaoId, mesReferencia);
      // se não existir (for nova) crio uma nova fatura
      if (!fatura) {
        fatura = new FaturaModel({
          cartaoId,
          mesReferencia,
          valor: 0,
          status: "aberta",
          dataVencimento: new Date(`${mesReferencia}-${diaVencimento}`),
        });
        // Salva a nova fatura no banco de dados
        await fatura.save();
      }

      const transacaoParcelada = {
        cartaoId,
        faturaId: fatura._id,
        descricao,
        categoria,
        valor: valorParcela,
        data: currentDate,
        parcelas,
        parcelaAtual: i + 1,
        mesReferencia,
      };

      // Atualiza o valor da fatura
      fatura.valor += transacaoParcelada.valor;
      await fatura.save();

      await TransacaoFaturaModel.create(transacaoParcelada);
      // Adiciona um mês para a próxima parcela
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }

  validar() {
    if (!this.body.cartaoId) {
      this.errors.push("Preencha com um ID válido para o cartão");
    }

    if (!this.body.descricao) {
      this.errors.push("Preencha a descrição da transação");
    }

    if (!this.body.categoria) {
      this.errors.push("Preencha a categoria da transação");
    }

    if (!this.body.valor || this.body.valor < 0) {
      this.errors.push("Insira um valor válido");
    }

    if (!this.body.data) {
      this.errors.push("Preencha a data da transação");
    }

    if (!this.body.parcelas || this.body.parcelas < 1) {
      this.errors.push("Insira um número válido de parcelas");
    }
  }
}

module.exports = TransacaoFatura;
