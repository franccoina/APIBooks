import { BooksController } from "./controllers/controllers.book.js"; // se importa la clase 'BooksController'.}
import { TemplateController } from "./controllers/controllers.template.js"; // se importa la clase 'TemplateController'.
import { BodyResponseGetById, BodyResponseGetBooks, DataBook } from "./models/model.book.js"; //Se importan los models de los books

const URL_DOMAIN: string = 'http://190.147.64.47:5155'; // variable con la URL de la API.

const prevPage = document.querySelector("#prev-page") as HTMLButtonElement
const nextPage = document.querySelector("#next-page") as HTMLButtonElement
let currentPage: number = 1;
const limit: number = 10;

//------------------------------------------------- BOOKS cards & crud -------------------------------------------------

const token = localStorage.getItem('authToken') as string; // se obtiene el token de localStorage.

if (!token) {
    alert('Authentication token is missing. Please log in...')
    window.location.href = './login.html';
} else {
    // se definen los selectores del formulario y el contenedor de las cards para obtener los valores. 
    const cardsContainer = document.querySelector('#cardsContainer') as HTMLDivElement

    const form = document.querySelector('form') as HTMLFormElement;
    const title = document.querySelector('#title') as HTMLInputElement;
    const author = document.querySelector('#author') as HTMLInputElement;
    const description = document.querySelector('#description') as HTMLInputElement;
    const summary = document.querySelector('#summary') as HTMLInputElement;
    const publicationDate = document.querySelector('#publication-date') as HTMLInputElement;

    let bookId: undefined | string

    const cardTemplate = new TemplateController(cardsContainer)

    const booksController = new BooksController(URL_DOMAIN)

    prevPage.addEventListener("click", async (e: Event) => {
        if (currentPage >= 1) {
            currentPage--;
            await allBooks(limit, currentPage);
        }
    });

    nextPage.addEventListener("click", async (e: Event) => {
        console.log("di click sobre next")
        console.log(currentPage)
        if (currentPage <= 1) {
            currentPage++;
            console.log(currentPage)
            await allBooks(limit, currentPage)
        }

    })

    form.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
        const crudBooks = new BooksController(URL_DOMAIN);

        if (bookId == undefined) {
            await crudBooks.create(token as string, title, author, description, summary, publicationDate)
        
        } else {
            await crudBooks.update(token as string, bookId, title, author, description, summary, publicationDate)
            bookId = undefined;
        }

        form.reset();
        await allBooks(limit, currentPage)

    });

    cardsContainer.addEventListener("click", async (ev: Event) => {
        if (ev.target instanceof HTMLButtonElement) {
            const booksController = new BooksController(URL_DOMAIN)

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

            } else if (ev.target.classList.contains("btn-delete")) {
                bookId = ev.target.dataset.id;
                if (bookId) {
                    const confirmDelte = confirm("Are you sure you want to delete")
                    
                    if (confirmDelte) {
                        {
                            await booksController.delete(token as string, bookId);
                            await allBooks(limit, currentPage)

                            bookId = undefined;
                        }
                    }
                }
            }
        }
    })

    //--------------------------------------------- RENDER ---------------------------------------------

    async function allBooks(limit: number, currentPage: number) {
        try {
            const response: BodyResponseGetBooks = await booksController.getAllBooks(token as string, limit, currentPage)
            const books: DataBook[] = response.data

            cardsContainer.innerHTML = ''

            for (const book of books) {
                cardTemplate.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate)
            }
        } catch (error) {
            console.error(`Error fetching books:`, error)
        }
    }
    allBooks(limit, currentPage)
}

//------------------------------------------------- addEventListener para el LOGOUT -------------------------------------------------

const btnLogout = document.querySelector('#btn-logout') as HTMLButtonElement

btnLogout.addEventListener('click', (ev: Event) => {
    ev.preventDefault();
    localStorage.removeItem('authToken');
    window.location.href = './login.html';
})












