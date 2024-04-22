const Transacao = require("../model/TransacaoModel");
exports.index = (req, res) => {
  res.render("lancamento");
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
