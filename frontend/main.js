import LoginCadastro from "./modules/LoginCadastro";
import * as dom from "./modules/domManipulation";

const register = new LoginCadastro(".formRegister");
register.init();

const login = new LoginCadastro(".formLogin");
login.init();

dom.saudacaoHome();
dom.exibirDatas();
dom.exibirValores();
dom.exibirTipos();
