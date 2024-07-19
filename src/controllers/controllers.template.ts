export class TemplateController {
    public cardsContainer: HTMLDivElement

    constructor(cardsContainer: HTMLDivElement) {
        this.cardsContainer = cardsContainer
    }

    async render(id:string, title: string, author: string, description: string,
        summary: string, publicationDate: string): Promise<void> {
        //Comenzamos definiendo cada elementos con sus atributos y creandolo en el HTML
        const cardDiv = document.createElement('div') as HTMLDivElement
        cardDiv.classList.add('card','mb-3')
        cardDiv.setAttribute('max-width','540px')
        
        const containerDiv = document.createElement('div') as HTMLDivElement
        containerDiv.classList.add('row','g-0')

        const contentDiv = document.createElement('div') as HTMLDivElement
        contentDiv.classList.add('col-md-8')

        const bodyContentDiv = document.createElement('div') as HTMLDivElement
        bodyContentDiv.classList.add('card-body')

        const h4Title = document.createElement('h4') as HTMLElement
        h4Title.textContent = title
        h4Title.classList.add('card-title')

        const pDescription = document.createElement('p') as HTMLParagraphElement
        pDescription.textContent = description
        pDescription.classList.add('card-text')

        const pSummary = document.createElement('p') as HTMLParagraphElement
        pSummary.classList.add('card-text')

        const smallSummary = document.createElement('small') as HTMLElement
        smallSummary.textContent = summary
        smallSummary.classList.add('text-body-secondary')

        const btnDelete = document.createElement('button') as HTMLButtonElement
        btnDelete.classList.add('btn-delete','btn-danger')
        btnDelete.textContent = "Delete"
        btnDelete.setAttribute('data-id',id)

        const btnUpdate = document.createElement('button') as HTMLButtonElement
        btnUpdate.classList.add('btn-update','btn-danger')
        btnUpdate.textContent = "Update"
        btnUpdate.setAttribute('data-id',id)

        const pPublicationDate = document.createElement('p') as HTMLParagraphElement
        pPublicationDate.textContent = publicationDate

        //AppendChilds para inyectar al HTML
        
        pSummary.appendChild(smallSummary)

        bodyContentDiv.appendChild(h4Title)
        bodyContentDiv.appendChild(pDescription)
        bodyContentDiv.appendChild(pSummary)
        bodyContentDiv.appendChild(btnUpdate)
        bodyContentDiv.appendChild(btnUpdate)
        bodyContentDiv.appendChild(pPublicationDate)

        contentDiv.appendChild(bodyContentDiv)

        containerDiv.appendChild(contentDiv)

        cardDiv.appendChild(containerDiv)

        this.cardsContainer.appendChild(cardDiv)
    }
}