const Cartao = require("../models/CartaoModel.js");
const Transacao = require("../models/TransacaoFaturaModel.js");
const { Fatura } = require("../models/FaturaModel.js");

// tela inicial de cartão de crédito
exports.index = async (req, res) => {
  const idUser = req.session.user._id;
  const cartoes = await Cartao.recuperarCartoes(idUser);

  const dados = JSON.stringify(cartoes);

  res.render("cartao-home", { dados });
};

exports.buscarFaturas = async (req, res) => {
  // recebo o mes que o usuário deseja filtrar
  const { mes } = req.body;
  const dados = [];

  const cartoes = await Cartao.recuperarCartoes(req.session.user._id);

  // criar um novo objeto com os dados necessários de duas tabelas
  if (cartoes.length > 0) {
    for (const cartao of cartoes) {
      const { _id, nome, limite, diaVencimento } = cartao;
      const faturaInfo = await Fatura.recuperarFaturaPorMes(_id, mes);
      if (faturaInfo) {
        const { valor, status, dataVencimento } = faturaInfo;
        dados.push({
          _id,
          nome,
          limite,
          valor,
          dataVencimento,
          status,
        });
      } else {
        dados.push({
          _id,
          nome,
          limite,
          dataVencimento: `${mes}-${diaVencimento}`,
          valor: 0,
          mesReferencia: mes,
          status: "aberta",
        });
      }
    }
  }
  res.render("includes/area-cartao", { dados });
};

exports.add = (req, res) => {
  res.render("tempCartao");
};

exports.register = async (req, res) => {
  req.body.userId = req.session.user._id;
  const cartao = new Cartao(req.body);

  await cartao.registrarCartao();

  if (cartao.errors.length > 0) {
    req.flash("errors", cartao.errors);
    console.log(cartao.errors);
    req.session.save(() => res.redirect("/cartao/add"));
    return;
  }
  req.flash("success", "Cartão registrado com sucesso");
  console.log("Cartão registrado com sucesso");
  req.session.save(() => res.redirect("/cartao/add"));
};

exports.tranFa = async (req, res) => {
  const idUser = req.session.user._id;
  const cartoes = await Cartao.recuperarCartoes(idUser);

  const dados = JSON.stringify(cartoes); // Aqui garantimos que os dados estejam em formato JSON
  res.render("tranFa", { dados });
};

exports.registerTran = async (req, res) => {
  // preciso do dia para complementear no atributo data de vencimento da fatura
  const { diaVencimento } = await Cartao.recuperarCartaoPorId(req.body.cartaoId);
  req.body.diaVencimento = diaVencimento;

  req.body.userId = req.session.user._id;
  const transacao = new Transacao(req.body);

  await transacao.registrarTransacao();

  if (transacao.errors.length > 0) {
    req.flash("errors", transacao.errors);
    console.log(transacao.errors);
    req.session.save(() => res.redirect("/cartao/tranFa"));
  }
  req.flash("success", "Transação registrada com sucesso");
  console.log("Transação registrada com sucesso");
};
