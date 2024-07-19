"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
class UsersController {
    constructor(domain) {
        this.domain = domain;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = {
                email: email.value,
                password: password.value
            };
            const headers = {
                //La API dice que los Headers (-H), deben ser estos
                'accept': '*/*',
                'Content-Type': 'application/json'
            };
            const reqOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(userData)
            };
            //Primero ponemos la URL y luego ponemos el objeto con los
            //parametros del crud (method, headers, body)
            //equivalente al response en crud
            const response = yield fetch(`${this.domain}/api/v1/auth/login`, reqOptions);
            //Capturamos el ERROR en caso de que la respuesta no tenga el atributo OK en 'true' (es decir, un 200)
            if (!response.ok) {
                console.log(`Response body: ${(yield response.json()).message}`);
                throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
            }
            // se obtiene la información esperada por la API y se transforma a código.
            //equivalente a la data en crud
            const responseBodyLogin = yield response.json();
            return responseBodyLogin;
        });
    }
}
exports.UsersController = UsersController;
