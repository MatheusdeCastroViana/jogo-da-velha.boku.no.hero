const menuHamburguer = document.querySelector('.menuHamburguer'); 
const menu = document.querySelector('.menu'); 

menuHamburguer.addEventListener('click', () => {
    menu.classList.toggle('active');
});