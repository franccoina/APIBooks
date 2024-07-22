import { BooksController } from "./controllers/controllers.book.js"; // se importa la clase 'BooksController'.
import { TemplateController } from "./controllers/controllers.template.js"; // se importa la clase 'TemplateController'.
import { BodyResponseGetById, BodyResponseGetBooks, DataBook } from "./models/model.book.js"; //Se importan los models de los books

const URL_DOMAIN: string = 'http://190.147.64.47:5155'; // variable con la URL de la API.

const prevPage = document.querySelector("#prev-page") as HTMLButtonElement;
const nextPage = document.querySelector("#next-page") as HTMLButtonElement;

let currentPage: number = 1;
const limit: number = 6;

//------------------------------------------------- BOOKS cards & crud -------------------------------------------------

const token = localStorage.getItem('authToken') as string; // se obtiene el token de localStorage.
const role = localStorage.getItem('authRole') as string; // se obtiene el role de localStorage.

if (!token) {
    alert('Authentication token is missing. Please log in...');
    window.location.href = '../index.html';
} else {
    if (role == 'admin') {
        // se definen los selectores del formulario y el contenedor de las cards para obtener los valores. 
        const cardsContainer = document.querySelector('#cardsContainer') as HTMLDivElement;
    
        const form = document.querySelector('form') as HTMLFormElement;
        const title = document.querySelector('#title') as HTMLInputElement;
        const author = document.querySelector('#author') as HTMLInputElement;
        const description = document.querySelector('#description') as HTMLInputElement;
        const summary = document.querySelector('#summary') as HTMLInputElement;
        const publicationDate = document.querySelector('#publication-date') as HTMLInputElement;
    
        let bookId: undefined | string;
    
        const cardTemplate = new TemplateController(cardsContainer);
    
        prevPage.addEventListener("click", async (ev: Event) => {
            if (currentPage > 1) {
                currentPage--;
                await allBooks(limit, currentPage);
            }
        });
    
        nextPage.addEventListener("click", async (ev: Event) => {
            if (currentPage >=1){
                currentPage++;
                await allBooks(limit, currentPage);
            }
        });
    
        form.addEventListener("submit", async (ev: Event) => {
            ev.preventDefault();
            const booksController = new BooksController(URL_DOMAIN);
    
            if (bookId === undefined) {
                await booksController.createBook(token, title, author, description, summary, publicationDate);
            } else {
                await booksController.updateBook(token, bookId, title, author, description, summary, publicationDate);
                bookId = undefined;
                form.reset()
            }
    
            form.reset();
            await allBooks(limit, currentPage);
        });
    
        cardsContainer.addEventListener("click", async (ev: Event) => {
            if (ev.target instanceof HTMLButtonElement) {
                const booksController = new BooksController(URL_DOMAIN);
    
                if (ev.target.classList.contains("btn-update")) {
                    bookId = ev.target.dataset.id;
                    // Para rellenar el formulario con los datos del book seleccionado
                    if (bookId) {
                        const foundBook: BodyResponseGetById = await booksController.findBookById(token, bookId);
                        
                        title.value = foundBook.data.title;
                        author.value = foundBook.data.author;
                        description.value = foundBook.data.description;
                        summary.value = foundBook.data.summary;
                        publicationDate.value = foundBook.data.publicationDate;
                    }
                } else if (ev.target.classList.contains("btn-delete")) {
                    let bookId = ev.target.dataset.id;
                    if (bookId) {
                        const confirmDelete = confirm("Are you sure you want to delete?");
                        if (confirmDelete) {
                            await booksController.deleteBook(token, bookId);
                            bookId = undefined;
                            await allBooks(limit, currentPage);
                        }
                    }
                }
            }
        });
    
        //--------------------------------------------- RENDER ---------------------------------------------
    
        async function allBooks(limit: number, currentPage: number) {
            const booksController = new BooksController(URL_DOMAIN);
            try {
                const response: BodyResponseGetBooks = await booksController.getAllBooks(token, limit, currentPage);
                const books: DataBook[] = response.data;
    
                cardsContainer.innerHTML = '';
    
                for (const book of books) {
                    cardTemplate.renderBooks(book.id, book.title, book.author, book.description, book.summary, book.publicationDate);
                }
            } catch (error) {
                console.error(`Error fetching books:`, error);
            }
        }
    
        allBooks(limit, currentPage);
    } else {
        // se definen los selectores del formulario y el contenedor de las cards para obtener los valores. 
        const cardsContainer = document.querySelector('#cardsContainer') as HTMLDivElement;
    
        const form = document.querySelector('form') as HTMLFormElement;
        const title = document.querySelector('#title') as HTMLInputElement;
        const author = document.querySelector('#author') as HTMLInputElement;
        const description = document.querySelector('#description') as HTMLInputElement;
        const summary = document.querySelector('#summary') as HTMLInputElement;
        const publicationDate = document.querySelector('#publication-date') as HTMLInputElement;
        
        let bookId: undefined | string;
    
        const cardTemplate = new TemplateController(cardsContainer);
    
        prevPage.addEventListener("click", async (ev: Event) => {
            if (currentPage > 1) {
                currentPage--;
                await allBooks(limit, currentPage);
            }
        });
    
        nextPage.addEventListener("click", async (ev: Event) => {
            if (currentPage >=1){
                currentPage++;
                await allBooks(limit, currentPage);
            }
        });
    
        cardsContainer.addEventListener("click", async (ev: Event) => {
            if (ev.target instanceof HTMLButtonElement) {
                const booksController = new BooksController(URL_DOMAIN);
    
                if (ev.target.classList.contains("btn")) {
                    alert('Normal users are not allowed to manage books information.')
                }
            }
        });

        form.innerHTML = `<p>You are not allowed to make changes. Try getting logged with an admin account.</p>`
    
        //--------------------------------------------- RENDER ---------------------------------------------
    
        async function allBooks(limit: number, currentPage: number) {
            const booksController = new BooksController(URL_DOMAIN);
            try {
                const response: BodyResponseGetBooks = await booksController.getAllBooks(token, limit, currentPage);
                const books: DataBook[] = response.data;
    
                cardsContainer.innerHTML = '';
    
                for (const book of books) {
                    cardTemplate.renderBooks(book.id, book.title, book.author, book.description, book.summary, book.publicationDate);
                }
            } catch (error) {
                console.error(`Error fetching books:`, error);
            }
        }
    
        allBooks(limit, currentPage);
    }
} 


//------------------------------------------------- addEventListener para el LOGOUT -------------------------------------------------

const btnLogout = document.querySelector('#btn-logout') as HTMLButtonElement;

btnLogout.addEventListener('click', (ev: Event) => {
    ev.preventDefault();
    localStorage.removeItem('authToken');
    window.location.href = '../index.html';
});
