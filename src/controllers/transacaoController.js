const Transacao = require("../model/TransacaoModel");
exports.index = (req, res) => {
  // passar lancamento vazio e tratar no ejs
  res.render("lancamento", { lancamento: {} });
};

exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const transacao = new Transacao(req.body);
    await transacao.register();

    if (transacao.errors.length > 0) {
      req.flash("errors", transacao.errors);
      req.session.save(() => {
        return res.redirect("/transacao");
      });
      return;
    }

    req.flash("success", "Transação adicionada com sucesso");
    req.session.save(() => {
      return res.redirect("/transacao");
    });
  } catch (e) {
    console.log("Erro ao registar", e);
    res.render("404");
  }
};

exports.edtTransacao = async (req, res) => {
  try {
    if (!req.params.id) return res.render("404");
    console.log(typeof req.params.id, req.params.id);

    const lancamento = await Transacao.buscarPorId(req.params.id);
    if (!lancamento) return res.render("404");

    res.render("lancamento", { lancamento });
  } catch (error) {
    console.log(error);
  }
};
