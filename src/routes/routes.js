const express = require("express");
const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController");
const transacaoController = require("../controllers/transacaoController");

//middleware
const { loginRequired } = require("../middlewares/middleware");

const router = express.Router();

// home
router.get("/", homeController.index);
router.post("/", homeController.filtrarMes);

//login
router.get("/login", loginController.index);
router.post("/login/register", loginController.register);
router.post("/login/login", loginController.login);
router.get("/logout", loginController.logout);

//cadastro
router.get("/transacao", loginRequired, transacaoController.index);
router.post("/transacao/register", loginRequired, transacaoController.register);
router.get("/transacao/index/:id", loginRequired, transacaoController.edtTransacao);
router.post("/transacao/edt/:id", loginRequired, transacaoController.editar);
router.get("/transacao/delete/:id", loginRequired, transacaoController.delete);

module.exports = router;
