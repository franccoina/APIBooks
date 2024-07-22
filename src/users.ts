import {UsersController} from "./controllers/controllers.user.js"; // se importa la clase 'UserController'.
import { TemplateController } from "./controllers/controllers.template.js"; // se importa la clase 'TemplateController'.
import { BodyResponseGetUsers, DataUser } from "./models/model.user.js"; //Se importan los models de los books

const URL_DOMAIN: string = 'http://190.147.64.47:5155'; // variable con la URL de la API.

const prevPage = document.querySelector("#prev-page") as HTMLButtonElement;
const nextPage = document.querySelector("#next-page") as HTMLButtonElement;

let currentPage: number = 1;
const limit: number = 6;

//------------------------------------------------- BOOKS cards & crud -------------------------------------------------

const token = localStorage.getItem('authToken') as string; // se obtiene el token de localStorage.

if (!token) {
    alert('Authentication token is missing. Please log in...');
    window.location.href = '../index.html';
} else {
    // se definen los selectores del formulario y el contenedor de las cards para obtener los valores. 
    const cardsContainer = document.querySelector('#cardsContainer') as HTMLDivElement;

    const form = document.querySelector('form') as HTMLFormElement;
    const name = document.querySelector('#name') as HTMLInputElement;
    const lastName = document.querySelector('#lastname') as HTMLInputElement;
    const email = document.querySelector('#email') as HTMLInputElement;
    const password = document.querySelector('#password') as HTMLInputElement;

    let role: string;

    let userId: undefined | string;

    const cardTemplate = new TemplateController(cardsContainer);

    prevPage.addEventListener("click", async (ev: Event) => {
        if (currentPage > 1) {
            currentPage--;
            await allUsers(limit, currentPage);
        }
    });

    nextPage.addEventListener("click", async (ev: Event) => {
        if (currentPage >=1){
            currentPage++;
            await allUsers(limit, currentPage);
        }
    });

    form.addEventListener("submit", async (ev: Event) => {
        ev.preventDefault();
        const booksController = new UsersController(URL_DOMAIN);

        if (userId === undefined) {
            await booksController.createUser(token, name, lastName, email, password);
        }

        form.reset();
        await allUsers(limit, currentPage);
    });

    cardsContainer.addEventListener("click", async (ev: Event) => {
        if (ev.target instanceof HTMLInputElement && ev.target.type === 'checkbox') {
            const usersController = new UsersController(URL_DOMAIN);
            const checkbox = ev.target as HTMLInputElement;
            
            form.reset()

            if (checkbox.checked) {
                userId = ev.target.dataset.id;
                // Para cambiar el role del usuario a 'admin'
                if (userId) {
                    role = 'admin';
                    await usersController.updateUserRole(token, userId, role);
                    userId = undefined;
                }
            } else {
                userId = ev.target.dataset.id;
                // Para cambiar el role del usuario a 'user'
                if (userId) {
                    role = 'user';
                    await usersController.updateUserRole(token, userId, role);
                    userId = undefined;
                }
            }
        }
        await allUsers(limit, currentPage)
    });

    //--------------------------------------------- RENDER ---------------------------------------------

    async function allUsers(limit: number, currentPage: number) {
        const usersController = new UsersController(URL_DOMAIN);
        try {
            const response: BodyResponseGetUsers = await usersController.getAllUsers(token, limit, currentPage);
            const users: DataUser[] = response.data;

            cardsContainer.innerHTML = '';

            for (const user of users) {
                cardTemplate.renderUsers(user.id, user.name, user.lastName, user.email, user.role);
            }
        } catch (error) {
            console.error(`Error fetching books:`, error);
        }
    }

    allUsers(limit, currentPage);
}

//------------------------------------------------- addEventListener para el LOGOUT -------------------------------------------------

const btnLogout = document.querySelector('#btn-logout') as HTMLButtonElement;

btnLogout.addEventListener('click', (ev: Event) => {
    ev.preventDefault();
    localStorage.removeItem('authToken');
    window.location.href = '../index.html';
});
