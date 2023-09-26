document.addEventListener("DOMContentLoaded", function () {
    const menuHamburguer = document.querySelector('.menuHamburguer');
    const menuResponsive = document.querySelector('.menuResponsive');
    const menuPersonagem = document.getElementById('personagem');
    const selectedPersonagemImg = document.getElementById('selected-personagem-img');
    const selectedPersonagemText = document.getElementById('selected-personagem-text');
    let pontuacao = 0;

    menuHamburguer.addEventListener('click', () => {
        menuResponsive.classList.toggle('active');
    });

    const closeMenuButton = document.getElementById('closeMenu');

    closeMenuButton.addEventListener('click', () => {
        menuResponsive.classList.remove('active');
    });

    // Atualiza a imagem e o texto do personagem selecionado
    menuPersonagem.addEventListener('change', function () {
        const personagemSelecionado = menuPersonagem.value;
        const personagemOption = menuPersonagem.querySelector(`[value="${personagemSelecionado}"]`);
        const personagemImgSrc = personagemOption.querySelector('img').getAttribute('src');
        const personagemNome = personagemOption.textContent;

        selectedPersonagemImg.src = personagemImgSrc;
        selectedPersonagemText.textContent = personagemNome;

        // Lógica para alterar a pontuação quando um personagem é selecionado
        if (personagemSelecionado === "personagem1") {
            pontuacao += 10; // Exemplo de aumento de pontuação para Midoriya
        } else if (personagemSelecionado === "personagem2") {
            pontuacao += 15; // Exemplo de aumento de pontuação para Bakugo
        } else {
            pontuacao += 5; // Pontuação padrão para outros personagens
        }

        // Atualiza o elemento HTML com a nova pontuação.
        pontuacaoElement.textContent = pontuacao;
    });

    // Inicialmente, defina a pontuação inicial
    const pontuacaoElement = document.getElementById('pontuacao');
    pontuacaoElement.textContent = pontuacao;
});