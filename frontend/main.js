import LoginCadastro from "./modules/LoginCadastro";

const register = new LoginCadastro(".formRegister");
register.init();

const login = new LoginCadastro(".formLogin");
login.init();
