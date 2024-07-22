var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UsersController } from "./controllers/controllers.user.js"; // se importa la clase 'UserController'.
import { TemplateController } from "./controllers/controllers.template.js"; // se importa la clase 'TemplateController'.
const URL_DOMAIN = 'http://190.147.64.47:5155'; // variable con la URL de la API.
const prevPage = document.querySelector("#prev-page");
const nextPage = document.querySelector("#next-page");
let currentPage = 1;
const limit = 6;
//------------------------------------------------- BOOKS cards & crud -------------------------------------------------
const token = localStorage.getItem('authToken'); // se obtiene el token de localStorage.
const role = localStorage.getItem('authRole'); // se obtiene el role de localStorage.
if (!token) {
    alert('Authentication token is missing. Please log in...');
    window.location.href = '../index.html';
}
else {
    if (role == 'admin') {
        // se definen los selectores del formulario y el contenedor de las cards para obtener los valores. 
        const cardsContainer = document.querySelector('#cardsContainer');
        const form = document.querySelector('form');
        const name = document.querySelector('#name');
        const lastName = document.querySelector('#lastname');
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        let role;
        let userId;
        const cardTemplate = new TemplateController(cardsContainer);
        prevPage.addEventListener("click", (ev) => __awaiter(void 0, void 0, void 0, function* () {
            if (currentPage > 1) {
                currentPage--;
                yield allUsers(limit, currentPage);
            }
        }));
        nextPage.addEventListener("click", (ev) => __awaiter(void 0, void 0, void 0, function* () {
            if (currentPage >= 1) {
                currentPage++;
                yield allUsers(limit, currentPage);
            }
        }));
        form.addEventListener("submit", (ev) => __awaiter(void 0, void 0, void 0, function* () {
            ev.preventDefault();
            const booksController = new UsersController(URL_DOMAIN);
            if (userId === undefined) {
                yield booksController.createUser(token, name, lastName, email, password);
            }
            form.reset();
            yield allUsers(limit, currentPage);
        }));
        cardsContainer.addEventListener("click", (ev) => __awaiter(void 0, void 0, void 0, function* () {
            if (ev.target instanceof HTMLInputElement && ev.target.type === 'checkbox') {
                const usersController = new UsersController(URL_DOMAIN);
                const checkbox = ev.target;
                form.reset();
                if (checkbox.checked) {
                    userId = ev.target.dataset.id;
                    // Para cambiar el role del usuario a 'admin'
                    if (userId) {
                        role = 'admin';
                        yield usersController.updateUserRole(token, userId, role);
                        userId = undefined;
                    }
                }
                else {
                    userId = ev.target.dataset.id;
                    // Para cambiar el role del usuario a 'user'
                    if (userId) {
                        role = 'user';
                        yield usersController.updateUserRole(token, userId, role);
                        userId = undefined;
                    }
                }
            }
            yield allUsers(limit, currentPage);
        }));
        //--------------------------------------------- RENDER ---------------------------------------------
        function allUsers(limit, currentPage) {
            return __awaiter(this, void 0, void 0, function* () {
                const usersController = new UsersController(URL_DOMAIN);
                try {
                    const response = yield usersController.getAllUsers(token, limit, currentPage);
                    const users = response.data;
                    cardsContainer.innerHTML = '';
                    for (const user of users) {
                        cardTemplate.renderUsers(user.id, user.name, user.lastName, user.email, user.role);
                    }
                }
                catch (error) {
                    console.error(`Error fetching books:`, error);
                }
            });
        }
        allUsers(limit, currentPage);
    }
    else {
        // se definen los selectores del formulario y el contenedor de las cards para obtener los valores. 
        const cardsContainer = document.querySelector('#cardsContainer');
        const form = document.querySelector('form');
        const name = document.querySelector('#name');
        const lastName = document.querySelector('#lastname');
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        let role;
        let userId;
        const cardTemplate = new TemplateController(cardsContainer);
        prevPage.addEventListener("click", (ev) => __awaiter(void 0, void 0, void 0, function* () {
            if (currentPage > 1) {
                currentPage--;
                yield allUsers(limit, currentPage);
            }
        }));
        nextPage.addEventListener("click", (ev) => __awaiter(void 0, void 0, void 0, function* () {
            if (currentPage >= 1) {
                currentPage++;
                yield allUsers(limit, currentPage);
            }
        }));
        form.innerHTML = `<p>You are not allowed to make changes. Try getting logged with an admin account.</p>`;
        cardsContainer.innerHTML = `<p>You are not allowed to see users data. Try getting logged with an admin account.</p>`;
        //--------------------------------------------- RENDER ---------------------------------------------
        function allUsers(limit, currentPage) {
            return __awaiter(this, void 0, void 0, function* () {
                const usersController = new UsersController(URL_DOMAIN);
                try {
                    const response = yield usersController.getAllUsers(token, limit, currentPage);
                    const users = response.data;
                    cardsContainer.innerHTML = '';
                    for (const user of users) {
                        cardTemplate.renderUsers(user.id, user.name, user.lastName, user.email, user.role);
                    }
                }
                catch (error) {
                    console.error(`Error fetching books:`, error);
                }
            });
        }
        allUsers(limit, currentPage);
    }
}
//------------------------------------------------- addEventListener para el LOGOUT -------------------------------------------------
const btnLogout = document.querySelector('#btn-logout');
btnLogout.addEventListener('click', (ev) => {
    ev.preventDefault();
    localStorage.removeItem('authToken');
    window.location.href = '../index.html';
});
