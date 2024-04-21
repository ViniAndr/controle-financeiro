const TransacaoModel = require("../model/TransacaoModel");
exports.index = (req, res) => {
  res.render("lancamento");
};

exports.register = async (req, res) => {
  try {
    const transacaoModel = new TransacaoModel(req.body);
    console.log(req.body);
    await transacaoModel.validar();

    if (transacaoModel.errors.length > 0) {
      req.flash("errors", transacaoModel.errors);
      req.session.save(() => {
        return res.redirect("/transacao");
      });
      return;
    }

    req.flash("success", "Login feito com sucesso");
    req.session.save(() => {
      return res.redirect("/");
    });
  } catch (e) {
    console.log("Erro ao registar", e);
    res.render("404");
  }
};
