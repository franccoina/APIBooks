"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateController = void 0;
class TemplateController {
    constructor(cardsContainer) {
        this.cardsContainer = cardsContainer;
    }
    render(id, title, author, description, summary, publicationDate) {
        return __awaiter(this, void 0, void 0, function* () {
            //Comenzamos definiendo cada elementos con sus atributos y creandolo en el HTML
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'mb-3');
            cardDiv.setAttribute('max-width', '540px');
            const containerDiv = document.createElement('div');
            containerDiv.classList.add('row', 'g-0');
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('col-md-8');
            const bodyContentDiv = document.createElement('div');
            bodyContentDiv.classList.add('card-body');
            const h4Title = document.createElement('h4');
            h4Title.textContent = title;
            h4Title.classList.add('card-title');
            const pDescription = document.createElement('p');
            pDescription.textContent = description;
            pDescription.classList.add('card-text');
            const pSummary = document.createElement('p');
            pSummary.classList.add('card-text');
            const smallSummary = document.createElement('small');
            smallSummary.textContent = summary;
            smallSummary.classList.add('text-body-secondary');
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn-delete', 'btn-danger');
            btnDelete.textContent = "Delete";
            btnDelete.setAttribute('data-id', id);
            const btnUpdate = document.createElement('button');
            btnUpdate.classList.add('btn-update', 'btn-danger');
            btnUpdate.textContent = "Update";
            btnUpdate.setAttribute('data-id', id);
            const pPublicationDate = document.createElement('p');
            pPublicationDate.textContent = publicationDate;
            //AppendChilds para inyectar al HTML
            pSummary.appendChild(smallSummary);
            bodyContentDiv.appendChild(h4Title);
            bodyContentDiv.appendChild(pDescription);
            bodyContentDiv.appendChild(pSummary);
            bodyContentDiv.appendChild(btnUpdate);
            bodyContentDiv.appendChild(btnUpdate);
            bodyContentDiv.appendChild(pPublicationDate);
            contentDiv.appendChild(bodyContentDiv);
            containerDiv.appendChild(contentDiv);
            cardDiv.appendChild(containerDiv);
            this.cardsContainer.appendChild(cardDiv);
        });
    }
}
exports.TemplateController = TemplateController;
