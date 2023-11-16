document.addEventListener("DOMContentLoaded", function () {
    const menuHamburguer = document.querySelector('.menuHamburguer');
    const menuResponsive = document.querySelector('.menuResponsive');
    const customSelect = document.getElementById('personagem');
    const options = customSelect.querySelectorAll('.options li');
    const personagens = document.querySelectorAll('.personagem');
    const viloes = document.querySelectorAll('.vilao');
    const pontuacaoElement = document.getElementById('placar-time-azul');
    let pontuacao = 0;

    options.forEach(option => {
        option.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            const imgSrc = this.querySelector('img').getAttribute('src');

            selectedPersonagemImg.src = imgSrc;
            selectedPersonagemText.textContent = value;
            customSelect.classList.remove('open');

            // Exibir ou ocultar heróis e vilões conforme a seleção
            if (value === 'Heróis') {
                personagens.forEach(personagem => personagem.style.display = 'block');
                viloes.forEach(vilao => vilao.style.display = 'none');
            } else if (value === 'Vilões') {
                personagens.forEach(personagem => personagem.style.display = 'none');
                viloes.forEach(vilao => vilao.style.display = 'block');
            }
        });
    });

    menuHamburguer.addEventListener('click', () => {
        menuResponsive.classList.toggle('active');
    });

    const closeMenuButton = document.getElementById('closeMenu');

    closeMenuButton.addEventListener('click', () => {
        menuResponsive.classList.remove('active');
    });

    options.forEach(option => {
        option.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            const imgSrc = this.getAttribute('data-img');

            selectedPersonagemImg.src = imgSrc;
            selectedPersonagemText.textContent = value;
            customSelect.classList.remove('open');
        });
    });

    customSelect.addEventListener('click', function () {
        // Alternar a abertura e o fechamento do menu de opções
        this.classList.toggle('open');
    });

    const scriptLoadedMarker = document.createElement('div');
    scriptLoadedMarker.id = 'script1-loaded';
    document.body.appendChild(scriptLoadedMarker);
});