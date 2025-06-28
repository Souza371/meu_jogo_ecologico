// Configurações do jogo
const GAME_DURATION = 60; // segundos
const SPAWN_INTERVAL = 2000; // milissegundos entre aparições de lixo
const POINTS_CORRECT = 10;
const POINTS_INCORRECT = -5;

// Estado do jogo
let gameState = {
    score: 0,
    timeLeft: GAME_DURATION,
    isPlaying: false,
    spawnTimer: null,
    gameTimer: null
};

// Tipos de lixo e suas categorias
const trashTypes = {
    papel: [
        { emoji: '📄', name: 'Papel' },
        { emoji: '📰', name: 'Jornal' },
        { emoji: '📦', name: 'Caixa' },
        { emoji: '📋', name: 'Papelão' }
    ],
    plastico: [
        { emoji: '🥤', name: 'Copo Plástico' },
        { emoji: '🍼', name: 'Garrafa' },
        { emoji: '🛍️', name: 'Sacola' },
        { emoji: '🥛', name: 'Embalagem' }
    ],
    vidro: [
        { emoji: '🍾', name: 'Garrafa de Vidro' },
        { emoji: '🫙', name: 'Pote' },
        { emoji: '🍷', name: 'Taça' },
        { emoji: '💡', name: 'Lâmpada' }
    ],
    metal: [
        { emoji: '🥫', name: 'Lata' },
        { emoji: '🔧', name: 'Ferramenta' },
        { emoji: '🪙', name: 'Moeda' },
        { emoji: '📎', name: 'Clipe' }
    ],
    organico: [
        { emoji: '🍎', name: 'Maçã' },
        { emoji: '🍌', name: 'Banana' },
        { emoji: '🥕', name: 'Cenoura' },
        { emoji: '🍃', name: 'Folha' }
    ]
};

// Elementos DOM
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const trashItemsContainer = document.getElementById('trash-items');
const feedbackElement = document.getElementById('feedback');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const bins = document.querySelectorAll('.bin');

// Inicializar o jogo
function initGame() {
    gameState.score = 0;
    gameState.timeLeft = GAME_DURATION;
    gameState.isPlaying = true;
    
    updateUI();
    startGameTimer();
    startSpawning();
    
    // Esconder tela de game over
    gameOverElement.style.display = 'none';
}

// Atualizar interface
function updateUI() {
    scoreElement.textContent = gameState.score;
    timerElement.textContent = gameState.timeLeft;
}

// Timer do jogo
function startGameTimer() {
    gameState.gameTimer = setInterval(() => {
        gameState.timeLeft--;
        updateUI();
        
        if (gameState.timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Começar a gerar lixo
function startSpawning() {
    spawnTrashItem();
    gameState.spawnTimer = setInterval(spawnTrashItem, SPAWN_INTERVAL);
}

// Gerar um item de lixo
function spawnTrashItem() {
    if (!gameState.isPlaying) return;
    
    // Escolher categoria aleatória
    const categories = Object.keys(trashTypes);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    // Escolher item aleatório da categoria
    const items = trashTypes[randomCategory];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    
    // Criar elemento do lixo
    const trashElement = document.createElement('div');
    trashElement.className = 'trash-item';
    trashElement.dataset.type = randomCategory;
    trashElement.draggable = true;
    
    // Posição aleatória
    const containerRect = trashItemsContainer.getBoundingClientRect();
    const maxX = containerRect.width - 80;
    const maxY = containerRect.height - 80;
    
    trashElement.style.left = Math.random() * maxX + 'px';
    trashElement.style.top = Math.random() * maxY + 'px';
    
    trashElement.innerHTML = `
        <div>${randomItem.emoji}</div>
        <div class="trash-item-label">${randomItem.name}</div>
    `;
    
    // Adicionar eventos de drag
    addDragEvents(trashElement);
    
    trashItemsContainer.appendChild(trashElement);
    
    // Remover automaticamente após 8 segundos se não for arrastado
    setTimeout(() => {
        if (trashElement.parentNode) {
            trashElement.remove();
        }
    }, 8000);
}

// Adicionar eventos de arrastar
function addDragEvents(element) {
    element.addEventListener('dragstart', (e) => {
        element.classList.add('dragging');
        e.dataTransfer.setData('text/plain', element.dataset.type);
    });
    
    element.addEventListener('dragend', () => {
        element.classList.remove('dragging');
    });
}

// Configurar eventos das lixeiras
bins.forEach(bin => {
    bin.addEventListener('dragover', (e) => {
        e.preventDefault();
        bin.classList.add('highlight');
    });
    
    bin.addEventListener('dragleave', () => {
        bin.classList.remove('highlight');
    });
    
    bin.addEventListener('drop', (e) => {
        e.preventDefault();
        bin.classList.remove('highlight');
        
        const draggedType = e.dataTransfer.getData('text/plain');
        const binType = bin.dataset.type;
        
        // Encontrar o elemento arrastado
        const draggedElement = document.querySelector('.trash-item.dragging');
        
        if (draggedElement) {
            if (draggedType === binType) {
                // Acerto!
                gameState.score += POINTS_CORRECT;
                showFeedback('Correto! +' + POINTS_CORRECT, 'correct');
            } else {
                // Erro!
                gameState.score += POINTS_INCORRECT;
                showFeedback('Errado! ' + POINTS_INCORRECT, 'incorrect');
            }
            
            updateUI();
            draggedElement.remove();
        }
    });
});

// Mostrar feedback
function showFeedback(message, type) {
    feedbackElement.textContent = message;
    feedbackElement.className = `feedback show ${type}`;
    
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 1000);
}

// Finalizar jogo
function endGame() {
    gameState.isPlaying = false;
    
    // Limpar timers
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
    }
    if (gameState.spawnTimer) {
        clearInterval(gameState.spawnTimer);
    }
    
    // Limpar itens de lixo restantes
    trashItemsContainer.innerHTML = '';
    
    // Mostrar tela de game over
    finalScoreElement.textContent = gameState.score;
    gameOverElement.style.display = 'flex';
}

// Reiniciar jogo
function restartGame() {
    // Limpar timers existentes
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
    }
    if (gameState.spawnTimer) {
        clearInterval(gameState.spawnTimer);
    }
    
    // Limpar container de lixo
    trashItemsContainer.innerHTML = '';
    
    // Reinicializar
    initGame();
}

// Iniciar o jogo quando a página carregar
window.addEventListener('load', () => {
    // Mostrar instruções iniciais
    setTimeout(() => {
        initGame();
    }, 1000);
});

// Suporte para dispositivos móveis (touch)
let touchItem = null;

document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element && element.classList.contains('trash-item')) {
        touchItem = element;
        touchItem.classList.add('dragging');
        e.preventDefault();
    }
});

document.addEventListener('touchmove', (e) => {
    if (touchItem) {
        const touch = e.touches[0];
        touchItem.style.position = 'fixed';
        touchItem.style.left = (touch.clientX - 40) + 'px';
        touchItem.style.top = (touch.clientY - 40) + 'px';
        touchItem.style.zIndex = '1000';
        e.preventDefault();
    }
});

document.addEventListener('touchend', (e) => {
    if (touchItem) {
        const touch = e.changedTouches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (element && element.classList.contains('bin')) {
            const draggedType = touchItem.dataset.type;
            const binType = element.dataset.type;
            
            if (draggedType === binType) {
                gameState.score += POINTS_CORRECT;
                showFeedback('Correto! +' + POINTS_CORRECT, 'correct');
            } else {
                gameState.score += POINTS_INCORRECT;
                showFeedback('Errado! ' + POINTS_INCORRECT, 'incorrect');
            }
            
            updateUI();
        }
        
        touchItem.remove();
        touchItem = null;
    }
});

