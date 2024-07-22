import { UsersController } from "./controllers/controllers.user.js"; // se importa la clase 'UsersController'.

const URL_DOMAIN: string = 'http://190.147.64.47:5155'; // variable con la URL de la API.

// se definen los selectores del formulario para obtener los valores. 

const form = document.querySelector('form') as HTMLFormElement;
const email = document.querySelector('#email') as HTMLInputElement;
const password = document.querySelector('#password') as HTMLInputElement;

form.addEventListener('submit', async (ev: Event) => {
    ev.preventDefault();

    const usersController = new UsersController(URL_DOMAIN); // se instancia la clase.
    const response = await usersController.login(email, password); // se emplea el método 'login' de la clase y se le dan los parámetros de entrada requeridos.

    const token: string | null = response.data.token; // la variable accede al token que se encuentra en la respuesta una vez el usuario administrador inicia sesión. 

    if (token) {
        console.log('Login was successful.');
        localStorage.setItem('authToken', token); // 'authToken - 'token' -> clave - valor para guardar el token en Local Storage.
        window.location.href = './pages/books.html' // redirige a la página donde se encuentran los libros una vez el usuario inicia sesión.
    }
    else {
        console.log('Login failed.');
    }

    form.reset();
})


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