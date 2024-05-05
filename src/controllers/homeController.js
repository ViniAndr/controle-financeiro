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

exports.filtrarMes = async (req, res) => {
  try {
    const { dataConsulta } = req.body;
    const userId = req.session.user._id;

    if (!dataConsulta || !userId) return res.render("404");
    const mes = dataConsulta.split("-")[1];
    const ano = dataConsulta.split("-")[0];

    const transacoes = await Transacao.buscarTransicoes(userId, mes, ano);

    res.render("index", { transacoes });
  } catch (error) {
    console.log(error);
  }
};
