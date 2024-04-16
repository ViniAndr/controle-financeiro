//DotEnv
require("dotenv").config();
//path
const path = require("path");
//express
const express = require("express");
const rotas = require("./src/routes/routes.js");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
//middleware
const middleware = require("./src/middlewares/middleware.js");
//mongoDB
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

// conexão com o BD
mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log("Conectadooo");
    app.emit("conectado");
  })
  .catch((e) => console.log("Erro ao conectar ao BD", e));

const sessionOptions = session({
  secret: "Segredoooo",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
});

// Configuração do body-parser para interpretar corpos de requisição codificados como URL
app.use(express.urlencoded({ extended: true }));

app.use(sessionOptions);
app.use(flash());

// configurando o diretorio para a views
app.set("views", path.resolve(__dirname, "src", "views"));
// define o mecanismo de visualização
app.set("view engine", "ejs");

// usando middleware, precisa ser acima das rotas para disponibilizar as "variáveis"
app.use(middleware.meddlewareTodasRotas);
// usando as rotas de routes
app.use(rotas);

app.on("conectado", () => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
  });
});
