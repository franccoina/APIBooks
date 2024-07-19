import { BodyResponseGetBooks, BodyResponseGetBookById} from './../models/model.book';

export class BooksController {
    public domain: string

    constructor(domain: string) {
        this.domain = domain
    }

    //------------------------------------------- GET ALL -----------------------------------------------------

    async getAllBooks(token: string, limit: number, page: number): Promise<BodyResponseGetBooks> {
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
        const response: Response = await fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`, reqOptions)
        if (!response.ok) {
            console.log(`Response body: ${(await response.json()).message}`)
            throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`)
        }
        const responseBodyGetBooks: BodyResponseGetBooks = await response.json()
        return responseBodyGetBooks
    }

    //------------------------------------------- FIND (GET ONE BY ID) -----------------------------------------------------
    async findBookById(token: string, bookId: number): Promise<BodyResponseGetBookById> {
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
        const responseBodyGetBookById: BodyResponseGetBookById = await response.json()
        return responseBodyGetBookById
    }

    //------------------------------------------- CREATE (POST) -------------------------------------------
    async create(): Promise <void>{

    }

    //------------------------------------------- DELETE -------------------------------------------
    async delete(token: string, bookId: string): Promise<void> {
        
    }

    //------------------------------------------- UPDATE (PUT) -------------------------------------------
    async update(token: string, bookId: string): Promise<void> {
    
    }
}