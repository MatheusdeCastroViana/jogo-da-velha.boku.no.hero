document.addEventListener("DOMContentLoaded", function () {
    const menuHamburguer = document.querySelector('.menuHamburguer');
    const menuResponsive = document.querySelector('.menuResponsive');
    const customSelect = document.getElementById('personagem');
    const options = customSelect.querySelectorAll('.options li');
    const selectedPersonagemImg = document.getElementById('selectedPersonagemImg');
    const selectedPersonagemText = document.getElementById('selectedPersonagemText');

    const cells = document.querySelectorAll('#game-board td');
    const resetButton = document.getElementById('reset-button');
    const placarTimeAzul = document.getElementById('placar-time-azul');
    const placarTimeVermelho = document.getElementById('placar-time-vermelho');

    let currentPlayer = 'X';
    let gameActive = true;
    let moves = 0;
    let playerStartsNextRound = true;

    options.forEach(option => {
        option.addEventListener('click', handleCharacterSelection);
    });

    menuHamburguer.addEventListener('click', toggleResponsiveMenu);

    const closeMenuButton = document.getElementById('closeMenu');
    closeMenuButton.addEventListener('click', closeResponsiveMenu);

    customSelect.addEventListener('click', toggleCharacterMenu);

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    function handleCharacterSelection() {
        const value = this.getAttribute('data-value');
        const imgSrc = this.querySelector('img').getAttribute('src');

        selectedPersonagemImg.src = imgSrc;
        selectedPersonagemText.textContent = value;
        customSelect.classList.remove('open');

        if (value === 'Heróis') {
            personagens.forEach(personagem => personagem.style.display = 'block');
            viloes.forEach(vilao => vilao.style.display = 'none');
        } else if (value === 'Vilões') {
            personagens.forEach(personagem => personagem.style.display = 'none');
            viloes.forEach(vilao => vilao.style.display = 'block');
        }
    }

    function handleCellClick() {
        if (this.textContent || !gameActive) {
            return;
        }

        this.textContent = currentPlayer;
        moves++;

        if (checkWin()) {
            updatePlacar();
            resetGame();
            return;
        }

        if (moves === 9) {
            resetGame();
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (gameActive && currentPlayer === 'O') {
            makeComputerMove();
        }
    }

    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        const result = winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });

        if (result || moves === 9) {
            clearBoard();
        }

        return result;
    }

    function updatePlacar() {
        if (currentPlayer === 'X') {
            placarTimeAzul.textContent = parseInt(placarTimeAzul.textContent) + 1;
        } else {
            placarTimeVermelho.textContent = parseInt(placarTimeVermelho.textContent) + 1;
        }
    }

    function resetGame() {
        clearBoard();
        currentPlayer = playerStartsNextRound ? 'X' : 'O';
        gameActive = true;
        moves = 0;
    
        // Inicie a jogada do bot apenas se o jogador não começar
        if (currentPlayer === 'O') {
            makeComputerMove();
        }
    }

    function makeComputerMove() {
        if (!gameActive) {
            return;
        }

        // Lógica simples para a jogada do computador
        const emptyCells = Array.from(cells).filter(cell => !cell.textContent);
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const chosenCell = emptyCells[randomIndex];
        chosenCell.textContent = 'O';

        if (checkWin()) {
            updatePlacar();
            gameActive = false;
            return;
        }

        currentPlayer = 'X';
    }

    function clearBoard() {
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }
});

function toggleResponsiveMenu() {
    const menuResponsive = document.querySelector('.menuResponsive');
    menuResponsive.classList.toggle('active');
}

function closeResponsiveMenu() {
    const menuResponsive = document.querySelector('.menuResponsive');
    menuResponsive.classList.remove('active');
}

function toggleCharacterMenu() {
    const customSelect = document.getElementById('personagem');
    customSelect.classList.toggle('open');
}

document.addEventListener("DOMContentLoaded", function () {
    // ... (seu código existente)

    const gameModeSelect = document.getElementById('gameMode');
    const gameModeOptions = gameModeSelect.querySelectorAll('.options li');
    const selectedGameModeText = document.getElementById('selected-game-mode-text');

    gameModeOptions.forEach(option => {
        option.addEventListener('click', handleGameModeSelection);
    });

    function handleGameModeSelection() {
        const value = this.getAttribute('data-value');
        selectedGameModeText.textContent = value;
        gameModeSelect.classList.remove('open');

        // Aqui você pode adicionar lógica adicional com base no modo de jogo selecionado, se necessário
    }
});

