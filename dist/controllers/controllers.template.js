export class TemplateController {
    constructor(cardsContainer) {
        this.cardsContainer = cardsContainer;
    }
    renderBooks(id, title, author, description, summary, publicationDate) {
        //Comenzamos definiendo cada elementos con sus atributos y creandolo en el HTML
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'mb-3');
        cardDiv.setAttribute('max-width', '540px');
        cardDiv.classList.add('col-md-8');
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('row', 'g-0');
        const contentDiv = document.createElement('div');
        const headerContentDiv = document.createElement('div');
        headerContentDiv.classList.add('card-body', 'bg-body-secondary');
        const bodyContentDiv = document.createElement('div');
        bodyContentDiv.classList.add('card-body');
        const h4Title = document.createElement('h4');
        h4Title.textContent = title;
        h4Title.classList.add('card-title');
        const smallAuthor = document.createElement('small');
        smallAuthor.textContent = author;
        smallAuthor.classList.add('text-body-secondary');
        const pDescription = document.createElement('p');
        pDescription.textContent = description;
        pDescription.classList.add('card-text');
        const hr = document.createElement('hr');
        const smallSummary = document.createElement('small');
        smallSummary.textContent = `📰 ${summary}`;
        smallSummary.classList.add('card-text', 'text-body-secondary');
        const btnUpdate = document.createElement('button');
        btnUpdate.classList.add('btn', 'btn-update', 'btn-outline-warning', 'me-2');
        btnUpdate.textContent = "Update";
        btnUpdate.setAttribute('data-id', id);
        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-delete', 'btn-outline-danger');
        btnDelete.textContent = "Delete";
        btnDelete.setAttribute('data-id', id);
        const pPublicationDate = document.createElement('p');
        pPublicationDate.textContent = publicationDate;
        //AppendChilds para inyectar al HTML
        headerContentDiv.appendChild(h4Title);
        headerContentDiv.appendChild(smallAuthor);
        bodyContentDiv.appendChild(pDescription);
        bodyContentDiv.appendChild(hr);
        bodyContentDiv.appendChild(smallSummary);
        bodyContentDiv.appendChild(pPublicationDate);
        bodyContentDiv.appendChild(btnUpdate);
        bodyContentDiv.appendChild(btnDelete);
        contentDiv.appendChild(headerContentDiv);
        contentDiv.appendChild(bodyContentDiv);
        containerDiv.appendChild(contentDiv);
        cardDiv.appendChild(containerDiv);
        this.cardsContainer.classList.add('d-flex', 'justify-content-center', 'flex-wrap', 'gap-5', 'pt-4');
        this.cardsContainer.appendChild(cardDiv);
    }
    renderUsers(id, name, lastName, email, role) {
        //Comenzamos definiendo cada elementos con sus atributos y creandolo en el HTML
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'mb-3');
        cardDiv.setAttribute('max-width', '540px');
        cardDiv.classList.add('col-md-8');
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('row', 'g-0');
        const contentDiv = document.createElement('div');
        const headerContentDiv = document.createElement('div');
        headerContentDiv.classList.add('card-body', 'bg-body-secondary');
        const bodyContentDiv = document.createElement('div');
        bodyContentDiv.classList.add('card-body', 'd-flex', 'flex-column');
        const h4FullName = document.createElement('h4');
        h4FullName.textContent = `${name} ${lastName}`;
        h4FullName.classList.add('card-title');
        const pEmail = document.createElement('p');
        pEmail.textContent = email;
        pEmail.classList.add('card-text', 'text-body-secondary');
        const hr = document.createElement('hr');
        const smallRole = document.createElement('small');
        smallRole.classList.add('card-text', 'text-body-secondary');
        const labelForCheckbox = document.createElement('label');
        labelForCheckbox.classList.add('mb-2', 'd-flex', 'flex-column', 'border', 'rounded', 'p-3', 'm-3');
        const checkboxAdminRole = document.createElement('input');
        checkboxAdminRole.type = "checkbox";
        checkboxAdminRole.value = "admin_role_checkbox";
        checkboxAdminRole.classList.add('mt-2');
        checkboxAdminRole.setAttribute('data-id', id);
        if (role === 'admin') {
            smallRole.textContent = `⚙️ Role: ${role}`;
            labelForCheckbox.textContent = "Revoke Admin Role";
            checkboxAdminRole.checked = true;
        }
        else if (role === 'user') {
            labelForCheckbox.textContent = "Grant Admin Role";
            smallRole.textContent = `👤 Role: ${role}`;
            checkboxAdminRole.checked = false;
        }
        //AppendChilds para inyectar al HTML
        headerContentDiv.appendChild(h4FullName);
        bodyContentDiv.appendChild(pEmail);
        bodyContentDiv.appendChild(hr);
        bodyContentDiv.appendChild(smallRole);
        bodyContentDiv.appendChild(labelForCheckbox);
        labelForCheckbox.appendChild(checkboxAdminRole);
        contentDiv.appendChild(headerContentDiv);
        contentDiv.appendChild(bodyContentDiv);
        containerDiv.appendChild(contentDiv);
        cardDiv.appendChild(containerDiv);
        this.cardsContainer.classList.add('d-flex', 'justify-content-center', 'flex-wrap', 'gap-5', 'pt-4');
        this.cardsContainer.appendChild(cardDiv);
    }
}
