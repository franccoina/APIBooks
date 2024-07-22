import { BodyRequestLogin, BodyResponseLogin, BodyResponseGetUsers, BodyResponseGetById,
    BodyRequestCreateUsers, BodyResponseCreateUsers, BodyResponseUpdateUsersRole } from '../models/model.user';

export class UsersController {
    public domain: string

    constructor(domain: string) {
        this.domain = domain
    }

    //------------------------------------------- LOGIN (POST) -------------------------------------------

    async login(email: HTMLInputElement, password: HTMLInputElement): Promise<BodyResponseLogin> {
        const userData: BodyRequestLogin = {
            email: email.value,
            password: password.value
        }
        const headers: Record<string, string> = {
            //La API dice que los Headers (-H), deben ser estos
            'accept': '*/*',
            'Content-Type': 'application/json'
        }
        const reqOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(userData)
        }
        //Primero ponemos la URL y luego ponemos el objeto con los
        //parametros del crud (method, headers, body)

        //equivalente al response en crud
        const response: Response = await fetch(`${this.domain}/api/v1/auth/login`, reqOptions)

        //Capturamos el ERROR en caso de que la respuesta no tenga el atributo OK en 'true' (es decir, un 200)
        if (!response.ok) {
            console.log(`Response body: ${(await response.json()).message}`)
            throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`)
        }

        // se obtiene la información esperada por la API y se transforma a código.
        //equivalente a la data en crud
        const responseBodyLogin: BodyResponseLogin = await response.json() 

        return responseBodyLogin;
    }

    //------------------------------------------- GET ALL -----------------------------------------------------

    async getAllUsers(token: string, limit: number, currentPage: number): Promise<BodyResponseGetUsers> {
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
        const response: Response = await fetch(`${this.domain}/api/v1/users?limit=${limit}&page=${currentPage}`, reqOptions)
        if (!response.ok) {
            console.log(`Response body: ${(await response.json()).message}`)
            throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`)
        }
        const responseBodyGetUsers: BodyResponseGetUsers = await response.json()
        return responseBodyGetUsers
    }

    //------------------------------------------- FIND (GET ONE BY ID) -----------------------------------------------------

    async findUserById(token: string, userId: string): Promise<BodyResponseGetById> {
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
        const response: Response = await fetch(`${this.domain}/api/v1/users/${userId}`, reqOptions)
        if (!response.ok) {
            console.log(`Response body: ${(await response.json()).message}`)
            throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`)
        }

        const responseBodyGetById: BodyResponseGetById = await response.json()
        return responseBodyGetById
    }

    //------------------------------------------- CREATE (POST) -------------------------------------------

    async createUser(token: string, name: HTMLInputElement, lastName: HTMLInputElement, 
        email: HTMLInputElement, password: HTMLInputElement): Promise<BodyResponseCreateUsers> {
        // se crea un objeto con los datos del USER que se quiere crear.
        //equivalente al request en crud
        const newUserData: BodyRequestCreateUsers = {
            name: name.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
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
            body: JSON.stringify(newUserData)
        }
        //Primero ponemos la URL y luego ponemos el objeto con los
        //parametros del crud (method, headers, body)

        //equivalente al response en crud
        const response: Response = await fetch(`${this.domain}/api/v1/users`, reqOptions)

        //Capturamos el ERROR en caso de que la respuesta no tenga el atributo OK en 'true' (es decir, un 200)
        if (!response.ok) {
            console.log(`Response body: ${(await response.json()).message}`)
            throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`)
        }

        // se obtiene la información esperada por la API y se transforma a código...
        //equivalente a la data en crud
        const responseBodyCreateUsers: BodyResponseCreateUsers = await response.json()
        return responseBodyCreateUsers;
    }

    //NOTA: En esta API, los USERS no pueden ser eliminados.

    //------------------------------------------- UPDATE ROLE (PATCH) -------------------------------------------
    
    //En este caso se prefiere usar PATCH en vez del metodo PUT, debido a mayor facilidad, un uso mas directo
    //y requerimientos de la API
    // -- En el UPDATE, solo podremos cambiar el role del usuario por determinacion de la API

    async updateUserRole(token: string, userId: string, role: string): Promise<BodyResponseUpdateUsersRole> {
        // se crea un objeto con los datos del USER que se quieren actualizar (Solo el ROLE, en este caso).
        
        const headers: Record<string, string> = {
            //La API dice que los Headers (-H), deben ser estos, y ahora debemos de enviar el token para
            //que sea admisible. Es como un 'codigo de administrador' para que la API pueda identificar el usuario
            'accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const reqOptions: RequestInit = {
            method: 'PATCH',
            headers: headers
        }
        //Primero ponemos la URL y luego ponemos el objeto con los
        //parametros del crud (method, headers, body)

        //equivalente al response en crud
        const response: Response = await fetch(`${this.domain}/api/v1/users/${userId}/role?role=${role}`, reqOptions)
        //Capturamos el ERROR en caso de que la respuesta no tenga el atributo OK en 'true' (es decir, un 200)
        if (!response.ok) {
            console.log(`Response body: ${(await response.json()).message}`)
            throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`)
        }
        // se obtiene la información esperada por la API y se transforma a código...
        //equivalente a la data en crud
        const responseBodyUpdateUsersRole: BodyResponseUpdateUsersRole = await response.json()
        return responseBodyUpdateUsersRole;
    }
}