const TransacaoFinanceira = require("../model/TransacaoModel");

// tela principal
exports.index = async (req, res) => {
  const transacoes = req.session.user
    ? await TransacaoFinanceira.buscarTransicoes(req.session.user._id)
    : await TransacaoFinanceira.buscarTransicoes();
  res.render("index", { transacoes });
};

// tela de login
exports.login = (req, res) => {
  res.render("includes/login");
};

// tela de index com filtro de mes sobre os transacoes financeiros
exports.filtrarMes = async (req, res) => {
  try {
    const { dataConsulta } = req.body;
    const userId = req.session.user._id;

    if (!dataConsulta || !userId) return res.render("404");
    const mes = dataConsulta.split("-")[1];
    const ano = dataConsulta.split("-")[0];

    const transacoes = await TransacaoFinanceira.buscarTransicoes(userId, mes, ano);

    res.render("index", { transacoes });
  } catch (error) {
    console.log(error);
  }
};
