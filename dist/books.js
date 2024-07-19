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
const controllers_book_js_1 = require("./controllers/controllers.book.js"); // se importa la clase 'BooksController'.}
const controllers_template_js_1 = require("./controllers/controllers.template.js"); // se importa la clase 'TemplateController'.
const URL_DOMAIN = 'http://190.147.64.47:5155'; // variable con la URL de la API.
const prevPage = document.querySelector("#prev-page");
const nextPage = document.querySelector("#next-page");
let currentPage = 1;
const limit = 10;
//------------------------------------------------- BOOKS cards & crud -------------------------------------------------
const token = localStorage.getItem('authToken'); // se obtiene el token de localStorage.
if (!token) {
    alert('Authentication token is missing. Please log in...');
    window.location.href = './login.html';
}
else {
    // se definen los selectores del formulario y el contenedor de las cards para obtener los valores. 
    const cardsContainer = document.querySelector('#cardsContainer');
    const form = document.querySelector('form');
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const description = document.querySelector('#description');
    const summary = document.querySelector('#summary');
    const publicationDate = document.querySelector('#publication-date');
    let bookId;
    const cardTemplate = new controllers_template_js_1.TemplateController(cardsContainer);
    const booksController = new controllers_book_js_1.BooksController(URL_DOMAIN);
    prevPage.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (currentPage >= 1) {
            currentPage--;
            yield allBooks(limit, currentPage);
        }
    }));
    nextPage.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("di click sobre next");
        console.log(currentPage);
        if (currentPage <= 1) {
            currentPage++;
            console.log(currentPage);
            yield allBooks(limit, currentPage);
        }
    }));
    form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const crudBooks = new controllers_book_js_1.BooksController(URL_DOMAIN);
        if (bookId == undefined) {
            yield crudBooks.create(token, title, author, description, summary, publicationDate);
        }
        else {
            yield crudBooks.update(token, bookId, title, author, description, summary, publicationDate);
            bookId = undefined;
        }
        form.reset();
        yield allBooks(limit, currentPage);
    }));
    cardsContainer.addEventListener("click", (ev) => __awaiter(void 0, void 0, void 0, function* () {
        if (ev.target instanceof HTMLButtonElement) {
            const booksController = new controllers_book_js_1.BooksController(URL_DOMAIN);
            if (ev.target.classList.contains("btn-update")) {
                bookId = ev.target.dataset.id;
                // if (bookId) {
                // const foundBook: BodyResponseGetById = await booksController.findBookById(token as string, bookId);
                // title.value = foundBook.data.title;
                // author.value = foundBook.data.author;
                // description.value = foundBook.data.desciption;
                // summary.value = foundBook.data.summary;
                // publicationDate.value = foundBook.data.publicationDate;
                // }
            }
            else if (ev.target.classList.contains("btn-delete")) {
                bookId = ev.target.dataset.id;
                if (bookId) {
                    const confirmDelte = confirm("Are you sure you want to delete");
                    if (confirmDelte) {
                        {
                            yield booksController.delete(token, bookId);
                            yield allBooks(limit, currentPage);
                            bookId = undefined;
                        }
                    }
                }
            }
        }
    }));
    //--------------------------------------------- RENDER ---------------------------------------------
    function allBooks(limit, currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield booksController.getAllBooks(token, limit, currentPage);
                const books = response.data;
                cardsContainer.innerHTML = '';
                for (const book of books) {
                    cardTemplate.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate);
                }
            }
            catch (error) {
                console.error(`Error fetching books:`, error);
            }
        });
    }
    allBooks(limit, currentPage);
}
//------------------------------------------------- addEventListener para el LOGOUT -------------------------------------------------
const btnLogout = document.querySelector('#btn-logout');
btnLogout.addEventListener('click', (ev) => {
    ev.preventDefault();
    localStorage.removeItem('authToken');
    window.location.href = './login.html';
});
