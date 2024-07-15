const TransacaoFinanceira = require("../models/TransacaoModel");
exports.index = (req, res) => {
  // passar lancamento vazio e tratar no ejs
  res.render("formTransacao", { transacao: {} });
};

exports.register = async (req, res) => {
  try {
    // Adicionando o ID do usuário logado na transação
    req.body.userId = req.session.user._id;

    const transacao = new TransacaoFinanceira(req.body);
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

    const transacao = await TransacaoFinanceira.buscarPorId(req.params.id);
    if (!transacao) return res.render("404");

    res.render("formTransacao", { transacao });
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

exports.editar = async (req, res) => {
  try {
    if (!req.params.id) return res.render("404");
    const transacao = new TransacaoFinanceira(req.body);
    transacao.edit(req.params.id);

    if (transacao.errors.length > 0) {
      req.flash("errors", transacao.errors);
      req.session.save(() => {
        return res.redirect("/transacao");
      });
      return;
    }

    req.flash("success", "Transação editada com sucesso");
    req.session.save(() => {
      return res.redirect("/transacao");
    });
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.params.id) return res.render("404");

    const transacao = await TransacaoFinanceira.delete(req.params.id);
    if (!transacao) return res.render("404");

    req.flash("success", "Transação deletada com sucesso");
    req.session.save(() => {
      return res.redirect("/");
    });
  } catch (error) {
    console.log(error);
  }
};
