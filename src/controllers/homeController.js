const Transacao = require("../model/TransacaoModel");
exports.index = async (req, res) => {
  const transacoes = req.session.user
    ? await Transacao.buscarTransicoes(req.session.user._id)
    : await Transacao.buscarTransicoes();
  res.render("index", { transacoes });
};

exports.login = (req, res) => {
  res.render("includes/login");
};
