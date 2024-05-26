const body = document.querySelector('body');
const menu = document.querySelector('.navbar');
const menuButton = document.getElementById('menu-btn');

menuButton.addEventListener('click', () => {
    menu.classList.toggle("active");
});
