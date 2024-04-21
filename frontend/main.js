import LoginCadastro from "./modules/LoginCadastro";
import { saudacaoHome } from "./modules/domManipulation";

const register = new LoginCadastro(".formRegister");
register.init();

const login = new LoginCadastro(".formLogin");
login.init();

saudacaoHome();
