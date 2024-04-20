const express = require("express");
const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController");
const lancamentoController = require("../controllers/lancamentoController");

//middleware
const { loginRequired } = require("../middlewares/middleware");

const router = express.Router();

// home
router.get("/", homeController.index);

//login
router.get("/login", loginController.index);
router.post("/login/register", loginController.register);
router.post("/login/login", loginController.login);
router.get("/logout", loginController.logout);

//cadastro
router.get("/lancamento", loginRequired, lancamentoController.index);

module.exports = router;
