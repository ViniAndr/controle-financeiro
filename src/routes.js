const express = require("express");
const router = express.Router();

// importações dos controlers
const homeController = require("./controllers/homeController");
const loginController = require("./controllers/loginController");
const transacaoController = require("./controllers/transacaoController");
const cartaoController = require("./controllers/cartaoController");

//middleware
const { loginRequired } = require("./middlewares/middleware");

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

//cartao
router.get("/cartao", loginRequired, cartaoController.index);
router.post("/cartao", loginRequired, cartaoController.buscarFaturas);
router.get("/cartao/add", loginRequired, cartaoController.add);
router.post("/cartao/register", loginRequired, cartaoController.register);
router.get("/cartao/tranFa", loginRequired, cartaoController.tranFa);
router.post("/cartao/tranFa", loginRequired, cartaoController.registerTran);

module.exports = router;
