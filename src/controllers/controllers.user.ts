import { BodyRequestLogin, BodyResponseLogin } from '../models/model.user';

export class UsersController {
    public domain: string

    constructor(domain: string) {
        this.domain = domain
    }

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
}