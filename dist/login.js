var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UsersController } from "./controllers/controllers.user.js"; // se importa la clase 'UsersController'.
const URL_DOMAIN = 'http://190.147.64.47:5155'; // variable con la URL de la API.
// se definen los selectores del formulario para obtener los valores. 
const form = document.querySelector('form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
form.addEventListener('submit', (ev) => __awaiter(void 0, void 0, void 0, function* () {
    ev.preventDefault();
    const usersController = new UsersController(URL_DOMAIN); // se instancia la clase.
    const response = yield usersController.login(email, password); // se emplea el método 'login' de la clase y se le dan los parámetros de entrada requeridos.
    const token = response.data.token; // la variable accede al token que se encuentra en la respuesta una vez el usuario administrador inicia sesión. 
    const role = response.data.role; // la variable accede al role que se encuentra en la respuesta una vez el usuario administrador inicia sesión. 
    if (token) {
        console.log('Login was successful.');
        localStorage.setItem('authToken', token); // 'authToken - 'token' -> clave - valor para guardar el token en Local Storage.
        window.location.href = './pages/home.html'; // redirige a la página donde se encuentran los libros una vez el usuario inicia sesión.
        localStorage.setItem('authRole', role);
    }
    else {
        console.log('Login failed.');
    }
    form.reset();
}));
//----------------------------------------- AUTH CREDENTIALS -----------------------------------------
//ADMIN
// {
//     "email": "prueba@prueba.pru",
//     "password": "C0ntr4S3gu++r4"
// }
//USER
// {
//     "email": "bill@gates.riwi",
//     "password": "abcd1234"
// }
