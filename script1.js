document.addEventListener("DOMContentLoaded", function () {
    const menuHamburguer = document.querySelector('.menuHamburguer');
    const menuResponsive = document.querySelector('.menuResponsive');

    menuHamburguer.addEventListener('click', () => {
        menuResponsive.classList.toggle('active');
    });

    const closeMenuButton = document.getElementById('closeMenu');

    closeMenuButton.addEventListener('click', () => {
        menuResponsive.classList.remove('active');
    });
});