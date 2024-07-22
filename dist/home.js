"use strict";
//------------------------------------------------- addEventListener para el LOGOUT -------------------------------------------------
const btnLogout = document.querySelector('#btn-logout');
btnLogout.addEventListener('click', (ev) => {
    ev.preventDefault();
    localStorage.removeItem('authToken');
    window.location.href = '../index.html';
});
