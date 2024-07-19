//------------------------------ LOGIN (POST) ------------------------------

//Interface del request o lo que mandamos en el LOGIN
export interface BodyRequestLogin {
    email: string,
    password: string
}

//Interface del response o lo que nos responde tras la request 
//en el LOGIN
//  Un Record es lo mismo que un string[]

export interface BodyResponseLogin {
    message: string,
    data: Record <string, string>
}


