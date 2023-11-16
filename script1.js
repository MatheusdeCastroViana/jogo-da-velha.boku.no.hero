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

document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll('#game-board td');
    const resetButton = document.getElementById('reset-button');
    const placarTimeAzul = document.getElementById('placar-time-azul');
    const placarTimeVermelho = document.getElementById('placar-time-vermelho');

    let currentPlayer = 'X';
    let gameActive = true;
    let moves = 0;

    // evento de clique para cada célula do tabuleiro
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // evento de clique para o botão de reiniciar o jogo
    resetButton.addEventListener('click', resetGame);

    function handleCellClick() {
        // Verificação se a célula já foi marcada e se o jogo ainda está ativo
        if (this.textContent || !gameActive) {
            return;
        }

        // Marcando a célula com o símbolo do jogador atual
        this.textContent = currentPlayer;

        // Verificando se o jogador atual venceu
        if (checkWin()) {
            updatePlacar();
            resetGame();
            return;
        }

        // Verificando se houve empate
        moves++;
        if (moves === 9) {
            resetGame();
            return;
        }

        // Alternando para o próximo jogador
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6]             // Diagonais
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    }

    function updatePlacar() {
        if (currentPlayer === 'X') {
            placarTimeAzul.textContent = parseInt(placarTimeAzul.textContent) + 1;
        } else {
            placarTimeVermelho.textContent = parseInt(placarTimeVermelho.textContent) + 1;
        }
    }

    function resetGame() {
        // Limpando o conteúdo das células
        cells.forEach(cell => {
            cell.textContent = '';
        });

        // Reiniciar as variáveis
        currentPlayer = 'X';
        gameActive = true;
        moves = 0;
    }
});