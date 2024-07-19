//------------------------------ GET ------------------------------

//Interface del response o lo que nos manda tras el GET 
//de los BOOKS
//  Un Record es lo mismo que un string[]

export interface BodyResponseGetBooks {
    message: string,
    data: DataBook[]
}

//Interface para la data que trae el response de nuestro GET ALL BOOKS
export interface DataBook {
    title: string,
    author: string,
    description: string,
    summary: string,
    publicationDate: Date,
    createdBy: string,
    updatedBy: null,
    deletedBy: null,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: null,
    files: any[]
}

//------------------------------ FIND (GET ONE BY ID) ------------------------------

//Interface del response o lo que nos manda tras el GET 
//de los BOOKS
//  Un Record es lo mismo que un string[]

export interface BodyResponseGetBookById {
    message: string,
    data: DataBook[]
}

//------------------------------ CREATE (POST) ------------------------------


//------------------------------ DELETE ------------------------------


//------------------------------ UPDATE (PUT) ------------------------------


