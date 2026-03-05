// Importing funcs and consts from other jses
import { playClick, playExplosion, playFlag, playWin } from './SoundManager.js';
import { ROWS, COLS, MINES, boardData, initBoardData, placeMinesData, calculateNeighborsData } from './GameLogic.js';

const boardElement = document.getElementById('game-board');
const mineCountElement = document.getElementById('mine-count');

let isGameOver = false;
let flagsPlaced = 0;
let cellsRevealed = 0;

function initGame() {
    initBoardData();
    placeMinesData();
    calculateNeighborsData();

    mineCountElement.innerText = MINES;

    boardElement.style.gridTemplateColumns = `repeat(${COLS}, 30px)`;
    boardElement.style.gridTemplateRows = `repeat(${ROWS}, 30px)`;

    // Bind HTML elements to our array for fast updating
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            
            cellElement.addEventListener('click', () => handleLeftClick(r, c));
            cellElement.addEventListener('contextmenu', (e) => handleRightClick(e, r, c));
            
            boardElement.appendChild(cellElement);
            
            boardData[r][c].element = cellElement; 
        }
    }
}

function handleLeftClick(r, c) {
    if (isGameOver || boardData[r][c].isFlagged) 
        return;
    revealCell(r, c);
    checkWinCondition();
}

function handleRightClick(e, r, c) {
    e.preventDefault(); 
    if (isGameOver || boardData[r][c].isRevealed) 
        return;

    const cell = boardData[r][c];
    cell.isFlagged = !cell.isFlagged;
    
    playFlag();
    
    if (cell.isFlagged) {
        cell.element.classList.add('flagged');
        flagsPlaced++;
    } else {
        cell.element.classList.remove('flagged');
        flagsPlaced--;
    }
    mineCountElement.innerText = MINES - flagsPlaced;
}

function revealCell(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) 
        return;
    const cell = boardData[r][c];
    if (cell.isRevealed || cell.isFlagged) 
        return;

    cell.isRevealed = true;
    cell.element.classList.add('revealed');
    cellsRevealed++;
    playClick();

    // Hit a mine -> Game over
    if (cell.isMine) {
        cell.element.classList.add('mine');
        triggerGameOver(false);
        return;
    }

    // Display numbers if there are adjacent mines, else automatically reveal neighbors
    if (cell.neighborMines > 0) {
        cell.element.innerText = cell.neighborMines;
        cell.element.dataset.neighbors = cell.neighborMines; 
    } else {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                revealCell(r + dr, c + dc);
            }
        }
    }
}

// Game over logic for both win and lose conditions
function triggerGameOver(isWin) {
    isGameOver = true;
    if (isWin) {
        playWin();
        setTimeout(() => alert("You Win!"), 100);
    } else {
        playExplosion();
        // Reveal all mines
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (boardData[r][c].isMine) {
                    boardData[r][c].element.classList.add('revealed', 'mine');
                }
            }
        }
        setTimeout(() => alert("Game Over! You hit a mine."), 100);
    }
}

function checkWinCondition() {
    const totalSafeCells = (ROWS * COLS) - MINES;
    if (cellsRevealed === totalSafeCells) {
        triggerGameOver(true);
    }
}

initGame();