//------------------------------ GET -------------------------------------------------

//Interface del response o lo que nos manda tras el GET 
//de los BOOKS
//  -- Un Record es lo mismo que un string[]

export interface BodyResponseGetBooks {
    message: string,
    data: DataBook[]
}

//Interface para la data que trae el response de nuestro GET ALL BOOKS
export interface DataBook {
    id: string,
    title: string,
    author: string,
    description: string,
    summary: string,
    publicationDate: string,
    createdBy: string,
    updatedBy: null,
    deletedBy: null,
    createdAt: string,
    updatedAt: string,
    deletedAt: null,
    files: any[]
}

//------------------------------ FIND (GET ONE BY ID) -------------------------------

//Interface del response o lo que nos manda tras el GET 
//de un BOOK en particular

export interface BodyResponseGetById {
    message: string,
    data: DataBook[]
}

//------------------------------ CREATE (POST) --------------------------------------

//Interface del request o lo que enviamos al crear los BOOKS
export interface BodyRequestCreateBooks {
    title: string,
    author: string,
    description: string,
    summary: string,
    publicationDate: string
}

//Interface del response o lo que nos responden al crear los BOOKS
export interface BodyResponseCreateBooks {
    message: string,
    data: Record<string, string>
}

//------------------------------ DELETE ---------------------------------------------
export interface BodyResponseDeleteBooks {
    message: string,
    data: null
}

//------------------------------ UPDATE (PATCH) ---------------------------------------
export interface BodyRequestUpdateBooks {
    title: string,
    author: string,
    description: string,
    summary: string,
    publicationDate: string
}
export interface BodyResponseUpdateBooks { 
    message: string,
    data: Record<string, string>
}

