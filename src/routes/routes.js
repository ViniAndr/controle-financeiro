const express = require("express");
const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController");

const router = express.Router();

router.get("/", homeController.index);

//login
router.get("/login", loginController.index);
router.post("/login/register", loginController.register);
router.post("/login/login", loginController.login);

module.exports = router;
