import LoginCadastro from "./modules/LoginCadastro";
import { init } from "./modules/domManipulation";
import { formularioDespesa } from "./modules/formDespesa";

const register = new LoginCadastro(".formRegister");
register.init();

const login = new LoginCadastro(".formLogin");
login.init();

// função resposável por chamar todas outras de exibição
init();
formularioDespesa();
