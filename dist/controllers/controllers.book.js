var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BooksController {
    constructor(domain) {
        this.domain = domain;
    }
    //------------------------------------------- GET ALL -----------------------------------------------------
    getAllBooks(token, limit, currentPage) {
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
            const response = yield fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${currentPage}`, reqOptions);
            if (!response.ok) {
                console.log(`Response body: ${(yield response.json()).message}`);
                throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
            }
            const responseBodyGetBooks = yield response.json();
            return responseBodyGetBooks;
        });
    }
    //------------------------------------------- FIND (GET ONE BY ID) -----------------------------------------------------
    findBookById(token, bookId) {
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
            const response = yield fetch(`${this.domain}/api/v1/books/${bookId}`, reqOptions);
            if (!response.ok) {
                console.log(`Response body: ${(yield response.json()).message}`);
                throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
            }
            const responseBodyGetById = yield response.json();
            return responseBodyGetById;
        });
    }
    //------------------------------------------- CREATE (POST) -------------------------------------------
    create(token, title, author, description, summary, publicationDate) {
        return __awaiter(this, void 0, void 0, function* () {
            // se crea un objeto con los datos del libro que se quiere crear.
            //equivalente al request en crud
            const newBookData = {
                title: title.value,
                author: author.value,
                description: description.value,
                summary: summary.value,
                publicationDate: publicationDate.value
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
                body: JSON.stringify(newBookData)
            };
            //Primero ponemos la URL y luego ponemos el objeto con los
            //parametros del crud (method, headers, body)
            //equivalente al response en crud
            const response = yield fetch(`${this.domain}/api/v1/books`, reqOptions);
            //Capturamos el ERROR en caso de que la respuesta no tenga el atributo OK en 'true' (es decir, un 200)
            if (!response.ok) {
                console.log(`Response body: ${(yield response.json()).message}`);
                throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
            }
            // se obtiene la información esperada por la API y se transforma a código...
            //equivalente a la data en crud
            const responseBodyCreateBooks = yield response.json();
            return responseBodyCreateBooks;
        });
    }
    //------------------------------------------- DELETE -------------------------------------------
    delete(token, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            // se crean los headers con el token para que la API pueda identificar el usuario.
            const headers = {
                //La API dice que los Headers (-H), deben ser estos, y ahora debemos de enviar el token para
                //que sea admisible. Es como un 'codigo de administrador' para que la API pueda identificar el usuario
                'accept': '*/*',
                'Authorization': `Bearer ${token}`
            };
            const reqOptions = {
                method: 'DELETE',
                headers: headers
            };
            //Primero ponemos la URL y luego ponemos el objeto con los
            //parametros del crud (method, headers, body)
            //equivalente al response en crud
            const response = yield fetch(`${this.domain}/api/v1/books/${bookId}`, reqOptions);
            if (!response.ok) {
                console.log(`Response body: ${(yield response.json()).message}`);
                throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
            }
            const responseBodyDeleteBook = yield response.json();
            return responseBodyDeleteBook;
        });
    }
    //------------------------------------------- UPDATE (PATCH) -------------------------------------------
    //En este caso se prefiere usar PATCH en vez del metodo PUT, debido a mayor facilidad y un uso mas directo
    update(token, bookId, title, author, description, summary, publicationDate) {
        return __awaiter(this, void 0, void 0, function* () {
            // se crea un objeto con los datos del libro que se quiere crear.
            //equivalente al request en crud
            const updatedBookData = {
                title: title.value,
                author: author.value,
                description: description.value,
                summary: summary.value,
                publicationDate: publicationDate.value
            };
            const headers = {
                //La API dice que los Headers (-H), deben ser estos, y ahora debemos de enviar el token para
                //que sea admisible. Es como un 'codigo de administrador' para que la API pueda identificar el usuario
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const reqOptions = {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(updatedBookData)
            };
            //Primero ponemos la URL y luego ponemos el objeto con los
            //parametros del crud (method, headers, body)
            //equivalente al response en crud
            const response = yield fetch(`${this.domain}/api/v1/books/${bookId}`, reqOptions);
            //Capturamos el ERROR en caso de que la respuesta no tenga el atributo OK en 'true' (es decir, un 200)
            if (!response.ok) {
                console.log(`Response body: ${(yield response.json()).message}`);
                throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
            }
            // se obtiene la información esperada por la API y se transforma a código...
            //equivalente a la data en crud
            const responseBodyUpdateBooks = yield response.json();
            return responseBodyUpdateBooks;
        });
    }
}
