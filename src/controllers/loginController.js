const Login = require("../model/LoginModel");

exports.index = (req, res) => {
  res.render("login");
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("/login");
      });
      return;
    }

    req.flash("success", "Conta criada com sucesso");
    req.session.save(() => {
      return res.redirect("/");
    });
  } catch (e) {
    console.log("Erro ao registar", e);
    res.render("404");
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("/login");
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
