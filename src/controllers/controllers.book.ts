import { BodyResponseGetBooks, BodyResponseGetById, BodyRequestCreateBooks, BodyResponseCreateBooks, 
    BodyRequestUpdateBooks, BodyResponseUpdateBooks, BodyResponseDeleteBooks } from './../models/model.book';

export class BooksController {
    public domain: string

    constructor(domain: string) {
        this.domain = domain
    }

    //------------------------------------------- GET ALL -----------------------------------------------------

    async getAllBooks(token: string, limit: number, currentPage: number): Promise<BodyResponseGetBooks> {
        // se crean los headers con el token para que la API pueda identificar el usuario.
        const headers: Record<string, string> = {
            //La API dice que los Headers (-H), deben ser estos, y ahora debemos de enviar el token para
            //que sea admisible. Es como un 'codigo de administrador' para que la API pueda identificar el usuario
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
        }
        const reqOptions: RequestInit = {
            method: 'GET',
            headers: headers
        }
        //Primero ponemos la URL y luego ponemos el objeto con los
        //parametros del crud (method, headers, body)

        //equivalente al response en crud
        const response: Response = await fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${currentPage}`, reqOptions)
        if (!response.ok) {
            console.log(`Response body: ${(await response.json()).message}`)
            throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`)
        }
        const responseBodyGetBooks: BodyResponseGetBooks = await response.json()
        return responseBodyGetBooks
    }

    //------------------------------------------- FIND (GET ONE BY ID) -----------------------------------------------------

    async findBookById(token: string, bookId: string): Promise<BodyResponseGetById> {
        // se crean los headers con el token para que la API pueda identificar el usuario.
        const headers: Record<string, string> = {
            //La API dice que los Headers (-H), deben ser estos, y ahora debemos de enviar el token para
            //que sea admisible. Es como un 'codigo de administrador' para que la API pueda identificar el usuario
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
        }
        const reqOptions: RequestInit = {
            method: 'GET',
            headers: headers
        }
        //Primero ponemos la URL y luego ponemos el objeto con los
        //parametros del crud (method, headers, body)

        //equivalente al response en crud
        const response: Response = await fetch(`${this.domain}/api/v1/books/${bookId}`, reqOptions)
        if (!response.ok) {
            console.log(`Response body: ${(await response.json()).message}`)
            throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`)
        }

        const responseBodyGetById: BodyResponseGetById = await response.json()
        return responseBodyGetById
    }

    //------------------------------------------- CREATE (POST) -------------------------------------------

    async create(token: string, title: HTMLInputElement, author: HTMLInputElement, description: HTMLInputElement,
        summary: HTMLInputElement, publicationDate: HTMLInputElement): Promise<BodyResponseCreateBooks> {
        // se crea un objeto con los datos del libro que se quiere crear.
        //equivalente al request en crud
        const newBookData: BodyRequestCreateBooks = {
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value,
            publicationDate: publicationDate.value
        }
        const headers: Record<string, string> = {
            //La API dice que los Headers (-H), deben ser estos, y ahora debemos de enviar el token para
            //que sea admisible. Es como un 'codigo de administrador' para que la API pueda identificar el usuario
            'accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const reqOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newBookData)
        }
        //Primero ponemos la URL y luego ponemos el objeto con los
        //parametros del crud (method, headers, body)

        //equivalente al response en crud
        const response: Response = await fetch(`${this.domain}/api/v1/books`, reqOptions)

        //Capturamos el ERROR en caso de que la respuesta no tenga el atributo OK en 'true' (es decir, un 200)
        if (!response.ok) {
            console.log(`Response body: ${(await response.json()).message}`)
            throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`)
        }

        // se obtiene la información esperada por la API y se transforma a código...
        //equivalente a la data en crud
        const responseBodyCreateBooks: BodyResponseCreateBooks = await response.json()
        return responseBodyCreateBooks;
    }

    //------------------------------------------- DELETE -------------------------------------------

    async delete(token: string, bookId: string): Promise<BodyResponseDeleteBooks> {
        // se crean los headers con el token para que la API pueda identificar el usuario.
        const headers: Record<string, string> = {
            //La API dice que los Headers (-H), deben ser estos, y ahora debemos de enviar el token para
            //que sea admisible. Es como un 'codigo de administrador' para que la API pueda identificar el usuario
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
        }
        const reqOptions: RequestInit = {
            method: 'DELETE',
            headers: headers
        }
        //Primero ponemos la URL y luego ponemos el objeto con los
        //parametros del crud (method, headers, body)

        //equivalente al response en crud
        const response: Response = await fetch(`${this.domain}/api/v1/books/${bookId}`, reqOptions)
        if (!response.ok) {
            console.log(`Response body: ${(await response.json()).message}`)
            throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`)
        }
        const responseBodyDeleteBook: BodyResponseDeleteBooks = await response.json()
        return responseBodyDeleteBook
    }

    //------------------------------------------- UPDATE (PATCH) -------------------------------------------
    
    //En este caso se prefiere usar PATCH en vez del metodo PUT, debido a mayor facilidad y un uso mas directo
    async update(token: string, bookId: string, title: HTMLInputElement, author: HTMLInputElement, description: HTMLInputElement,
        summary: HTMLInputElement, publicationDate: HTMLInputElement): Promise<BodyResponseUpdateBooks> {
        // se crea un objeto con los datos del libro que se quiere crear.
        //equivalente al request en crud
        const updatedBookData: BodyRequestUpdateBooks = {
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value,
            publicationDate: publicationDate.value
        }
        const headers: Record<string, string> = {
            //La API dice que los Headers (-H), deben ser estos, y ahora debemos de enviar el token para
            //que sea admisible. Es como un 'codigo de administrador' para que la API pueda identificar el usuario
            'accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const reqOptions: RequestInit = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(updatedBookData)
        }
        //Primero ponemos la URL y luego ponemos el objeto con los
        //parametros del crud (method, headers, body)

        //equivalente al response en crud
        const response: Response = await fetch(`${this.domain}/api/v1/books/${bookId}`, reqOptions)
        //Capturamos el ERROR en caso de que la respuesta no tenga el atributo OK en 'true' (es decir, un 200)
        if (!response.ok) {
            console.log(`Response body: ${(await response.json()).message}`)
            throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`)
        }
        // se obtiene la información esperada por la API y se transforma a código...
        //equivalente a la data en crud
        const responseBodyUpdateBooks: BodyResponseUpdateBooks = await response.json()
        return responseBodyUpdateBooks;
    }
}