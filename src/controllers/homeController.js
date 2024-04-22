const Transacao = require("../model/TransacaoModel");
exports.index = async (req, res) => {
  const transacoes = await Transacao.buscarTransicoes();
  res.render("index", { transacoes });
};

exports.login = (req, res) => {
  res.render("includes/login");
};
