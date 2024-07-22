export class TemplateController {
    public cardsContainer: HTMLDivElement

    constructor(cardsContainer: HTMLDivElement) {
        this.cardsContainer = cardsContainer
    }

    render(id: string, title: string, author: string, description: string,
        summary: string, publicationDate: string): void {
        //Comenzamos definiendo cada elementos con sus atributos y creandolo en el HTML
        const cardDiv = document.createElement('div') as HTMLDivElement
        cardDiv.classList.add('card', 'mb-3')
        cardDiv.setAttribute('max-width', '540px')
        cardDiv.classList.add('col-md-8')

        const containerDiv = document.createElement('div') as HTMLDivElement
        containerDiv.classList.add('row', 'g-0')

        const contentDiv = document.createElement('div') as HTMLDivElement

        const headerContentDiv = document.createElement('div') as HTMLDivElement
        headerContentDiv.classList.add('card-body', 'bg-body-secondary')

        const bodyContentDiv = document.createElement('div') as HTMLDivElement
        bodyContentDiv.classList.add('card-body')

        const h4Title = document.createElement('h4') as HTMLElement
        h4Title.textContent = title
        h4Title.classList.add('card-title')

        const smallAuthor = document.createElement('small') as HTMLElement
        smallAuthor.textContent = author
        smallAuthor.classList.add('text-body-secondary')

        const pDescription = document.createElement('p') as HTMLParagraphElement
        pDescription.textContent = description
        pDescription.classList.add('card-text')

        const hr = document.createElement('hr') as HTMLElement

        const smallSummary = document.createElement('small') as HTMLElement
        smallSummary.textContent = `📰 ${summary}`
        smallSummary.classList.add('card-text', 'text-body-secondary')

        const btnUpdate = document.createElement('button') as HTMLButtonElement
        btnUpdate.classList.add('btn', 'btn-update', 'btn-warning', 'me-2')
        btnUpdate.textContent = "Update"
        btnUpdate.setAttribute('data-id', id)

        const btnDelete = document.createElement('button') as HTMLButtonElement
        btnDelete.classList.add('btn', 'btn-delete', 'btn-danger')
        btnDelete.textContent = "Delete"
        btnDelete.setAttribute('data-id', id)

        const pPublicationDate = document.createElement('p') as HTMLParagraphElement
        pPublicationDate.textContent = publicationDate

        //AppendChilds para inyectar al HTML

        headerContentDiv.appendChild(h4Title)
        headerContentDiv.appendChild(smallAuthor)

        bodyContentDiv.appendChild(pDescription)
        bodyContentDiv.appendChild(hr)
        bodyContentDiv.appendChild(smallSummary)
        bodyContentDiv.appendChild(pPublicationDate)
        bodyContentDiv.appendChild(btnUpdate)
        bodyContentDiv.appendChild(btnDelete)

        contentDiv.appendChild(headerContentDiv)
        contentDiv.appendChild(bodyContentDiv)

        containerDiv.appendChild(contentDiv)

        cardDiv.appendChild(containerDiv)

        this.cardsContainer.classList.add('d-flex', 'justify-content-center', 'flex-wrap', 'gap-5', 'pt-4')
        this.cardsContainer.appendChild(cardDiv)
    }
}