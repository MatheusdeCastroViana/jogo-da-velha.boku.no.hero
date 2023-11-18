document.addEventListener("DOMContentLoaded", function () {
    // Seletor do menu hamburguer
    const menuHamburguer = document.querySelector('.menuHamburguer');
    // Seletor do menu responsivo
    const menuResponsive = document.querySelector('.menuResponsive');
    // Seletor do menu de seleção de personagens
    const customSelect = document.getElementById('personagem');
    // Opções do menu de seleção de personagens
    const options = customSelect.querySelectorAll('.options li');
    // Elementos dos personagens e vilões
    const personagens = document.querySelectorAll('.personagem');
    const viloes = document.querySelectorAll('.vilao');

    // Pontuação do time azul
    const pontuacaoElement = document.getElementById('placar-time-azul');
    let pontuacao = 0;

    // Evento de clique para cada opção do menu de seleção de personagens
    options.forEach(option => {
        option.addEventListener('click', handleCharacterSelection);
    });

    // Evento de clique para o menu hamburguer
    menuHamburguer.addEventListener('click', toggleResponsiveMenu);

    // Fechar o menu responsivo
    const closeMenuButton = document.getElementById('closeMenu');
    closeMenuButton.addEventListener('click', closeResponsiveMenu);

    // Evento de clique para o menu de seleção de personagens
    customSelect.addEventListener('click', toggleCharacterMenu);

    // Marcador para o script carregado
    const scriptLoadedMarker = document.createElement('div');
    scriptLoadedMarker.id = 'script1-loaded';
    document.body.appendChild(scriptLoadedMarker);

    // Elementos do tabuleiro do jogo
    const cells = document.querySelectorAll('#game-board td');
    // Botão de reiniciar o jogo
    const resetButton = document.getElementById('reset-button');
    // Elementos do placar
    const placarTimeAzul = document.getElementById('placar-time-azul');
    const placarTimeVermelho = document.getElementById('placar-time-vermelho');

    let currentPlayer = 'X';
    let gameActive = true;
    let moves = 0;

    // Adicionar evento de clique para cada célula do tabuleiro
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // Adicionar evento de clique para o botão de reiniciar o jogo
    resetButton.addEventListener('click', resetGame);

    // Função para lidar com a seleção de personagens
    function handleCharacterSelection() {
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
    }

    // Função para lidar com o clique no tabuleiro
    function handleCellClick() {
        if (this.textContent || !gameActive) {
            return;
        }

        this.textContent = currentPlayer;

        if (checkWin()) {
            updatePlacar();
            resetGame();
            return;
        }

        moves++;
        if (moves === 9) {
            resetGame();
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (gameActive && currentPlayer === 'O') {
            makeComputerMove();
        }
    }

    // Função para verificar se há uma vitória
    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    }

    // Função para atualizar o placar
    function updatePlacar() {
        if (currentPlayer === 'X') {
            placarTimeAzul.textContent = parseInt(placarTimeAzul.textContent) + 1;
        } else {
            placarTimeVermelho.textContent = parseInt(placarTimeVermelho.textContent) + 1;
        }
    }

    // Função para reiniciar o jogo
    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
        });

        currentPlayer = 'X';
        gameActive = true;
        moves = 0;
    }

    // Função para fazer a jogada do computador
    function makeComputerMove() {
        const emptyCells = Array.from(cells).filter(cell => !cell.textContent);
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const randomCell = emptyCells[randomIndex];
            randomCell.textContent = 'O';

            if (checkWin()) {
                updatePlacar();
                resetGame();
                return;
            }

            moves++;
            if (moves === 9) {
                resetGame();
                return;
            }

            currentPlayer = 'X';
        }
    }
});

// Função para alternar o menu responsivo
function toggleResponsiveMenu() {
    const menuResponsive = document.querySelector('.menuResponsive');
    menuResponsive.classList.toggle('active');
}

// Função para fechar o menu responsivo
function closeResponsiveMenu() {
    const menuResponsive = document.querySelector('.menuResponsive');
    menuResponsive.classList.remove('active');
}

// Função para alternar o menu de seleção de personagens
function toggleCharacterMenu() {
    const customSelect = document.getElementById('personagem');
    customSelect.classList.toggle('open');
}
