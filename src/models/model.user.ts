//------------------------------ LOGIN (POST) ------------------------------

//Interface del request o lo que mandamos en el LOGIN
export interface BodyRequestLogin {
    email: string,
    password: string
}

//Interface del response o lo que nos responde tras la request 
//en el LOGIN
//  -- Un Record es lo mismo que un string[]

export interface BodyResponseLogin {
    message: string,
    data: Record <string, string>
}

//------------------------------ GET ALL -------------------------------------------------

//Interface del response o lo que nos manda tras el GET 
//de los USERS 
//  -- Un Record es lo mismo que un string[]

export interface BodyResponseGetUsers {
    message: string,
    data: DataUser[]
}

//Interface para la data que trae el response de nuestro GET ALL USERS
export interface DataUser {
    id: string,
    role: string,
    name: string,
    lastName: string,
    email: string,
    updatedBy: null,
    deletedBy: null,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: null
}

//------------------------------ FIND (GET ONE BY ID) -------------------------------

//Interface del response o lo que nos manda tras el GET 
//de un USER en particular

export interface BodyResponseGetById {
    message: string,
    data: Record<string, string>;
}

//------------------------------ CREATE (POST) --------------------------------------

//Interface del request o lo que enviamos al crear los USERS
export interface BodyRequestCreateUsers {
    name: string,
    lastName: string,
    email: string,
    password: string
}

//Interface del response o lo que nos responden al crear los BOOKS
export interface BodyResponseCreateUsers {
    message: string,
    data: Record<string, string>
}

//------------------------------ UPDATE ROLE (PATCH) ---------------------------------------

export interface BodyResponseUpdateUsersRole{ 
    message: string,
    data: Record<string, string>
}



