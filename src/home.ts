//------------------------------------------------- addEventListener para el LOGOUT -------------------------------------------------

const btnLogout = document.querySelector('#btn-logout') as HTMLButtonElement;

btnLogout.addEventListener('click', (ev: Event) => {
    ev.preventDefault();
    localStorage.removeItem('authToken');
    window.location.href = '../index.html';
});
