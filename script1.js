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

    let pontuacao = 0;
    pontuacao += 10; //Aumenta a pontuação em 10

    //Atualiza o elemento HTML com a nova pontuação.
    document.getElementById("pontuacao").textContent = pontuacao;
});