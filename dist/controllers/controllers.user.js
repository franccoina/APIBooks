var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class UsersController {
    constructor(domain) {
        this.domain = domain;
    }
    //------------------------------------------- LOGIN (POST) -------------------------------------------
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
    //------------------------------------------- GET ALL -----------------------------------------------------
    getAllUsers(token, limit, currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            // se crean los headers con el token para que la API pueda identificar el usuario.
            const headers = {
                //La API dice que los Headers (-H), deben ser estos, y ahora debemos de enviar el token para
                //que sea admisible. Es como un 'codigo de administrador' para que la API pueda identificar el usuario
                'accept': '*/*',
                'Authorization': `Bearer ${token}`
            };
            const reqOptions = {
                method: 'GET',
                headers: headers
            };
            //Primero ponemos la URL y luego ponemos el objeto con los
            //parametros del crud (method, headers, body)
            //equivalente al response en crud
            const response = yield fetch(`${this.domain}/api/v1/users?limit=${limit}&page=${currentPage}`, reqOptions);
            if (!response.ok) {
                console.log(`Response body: ${(yield response.json()).message}`);
                throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
            }
            const responseBodyGetUsers = yield response.json();
            return responseBodyGetUsers;
        });
    }
    //------------------------------------------- FIND (GET ONE BY ID) -----------------------------------------------------
    findUserById(token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // se crean los headers con el token para que la API pueda identificar el usuario.
            const headers = {
                //La API dice que los Headers (-H), deben ser estos, y ahora debemos de enviar el token para
                //que sea admisible. Es como un 'codigo de administrador' para que la API pueda identificar el usuario
                'accept': '*/*',
                'Authorization': `Bearer ${token}`
            };
            const reqOptions = {
                method: 'GET',
                headers: headers
            };
            //Primero ponemos la URL y luego ponemos el objeto con los
            //parametros del crud (method, headers, body)
            //equivalente al response en crud
            const response = yield fetch(`${this.domain}/api/v1/users/${userId}`, reqOptions);
            if (!response.ok) {
                console.log(`Response body: ${(yield response.json()).message}`);
                throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
            }
            const responseBodyGetById = yield response.json();
            return responseBodyGetById;
        });
    }
    //------------------------------------------- CREATE (POST) -------------------------------------------
    createUser(token, name, lastName, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // se crea un objeto con los datos del USER que se quiere crear.
            //equivalente al request en crud
            const newUserData = {
                name: name.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value
            };
            const headers = {
                //La API dice que los Headers (-H), deben ser estos, y ahora debemos de enviar el token para
                //que sea admisible. Es como un 'codigo de administrador' para que la API pueda identificar el usuario
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const reqOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(newUserData)
            };
            //Primero ponemos la URL y luego ponemos el objeto con los
            //parametros del crud (method, headers, body)
            //equivalente al response en crud
            const response = yield fetch(`${this.domain}/api/v1/users`, reqOptions);
            //Capturamos el ERROR en caso de que la respuesta no tenga el atributo OK en 'true' (es decir, un 200)
            if (!response.ok) {
                console.log(`Response body: ${(yield response.json()).message}`);
                throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
            }
            // se obtiene la información esperada por la API y se transforma a código...
            //equivalente a la data en crud
            const responseBodyCreateUsers = yield response.json();
            return responseBodyCreateUsers;
        });
    }
    //NOTA: En esta API, los USERS no pueden ser eliminados.
    //------------------------------------------- UPDATE ROLE (PATCH) -------------------------------------------
    //En este caso se prefiere usar PATCH en vez del metodo PUT, debido a mayor facilidad, un uso mas directo
    //y requerimientos de la API
    // -- En el UPDATE, solo podremos cambiar el role del usuario por determinacion de la API
    updateUserRole(token, userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            // se crea un objeto con los datos del USER que se quieren actualizar (Solo el ROLE, en este caso).
            const headers = {
                //La API dice que los Headers (-H), deben ser estos, y ahora debemos de enviar el token para
                //que sea admisible. Es como un 'codigo de administrador' para que la API pueda identificar el usuario
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const reqOptions = {
                method: 'PATCH',
                headers: headers
            };
            //Primero ponemos la URL y luego ponemos el objeto con los
            //parametros del crud (method, headers, body)
            //equivalente al response en crud
            const response = yield fetch(`${this.domain}/api/v1/users/${userId}/role?role=${role}`, reqOptions);
            //Capturamos el ERROR en caso de que la respuesta no tenga el atributo OK en 'true' (es decir, un 200)
            if (!response.ok) {
                console.log(`Response body: ${(yield response.json()).message}`);
                throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
            }
            // se obtiene la información esperada por la API y se transforma a código...
            //equivalente a la data en crud
            const responseBodyUpdateUsersRole = yield response.json();
            return responseBodyUpdateUsersRole;
        });
    }
}
