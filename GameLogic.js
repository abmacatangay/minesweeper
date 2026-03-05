export const ROWS = 15;
export const COLS = 15;
export const MINES = 30;

export let boardData = [];

export function initBoardData() {
    boardData = [];
    for (let r = 0; r < ROWS; r++) {
        let rowArray = [];
        for (let c = 0; c < COLS; c++) {
            rowArray.push({
                // Initialize each cell with its coordinates and default properties
                row: r,
                col: c,
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborMines: 0,
                element: null 
            });
        }
        boardData.push(rowArray);
    }
}

export function placeMinesData() {
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
        // Randomly select a cell for the mine
        const r = Math.floor(Math.random() * ROWS);
        const c = Math.floor(Math.random() * COLS);
        // Check if there is already a mine in that cell, else place one
        if (!boardData[r][c].isMine) {
            boardData[r][c].isMine = true;
            minesPlaced++;
        }
    }
}

export function calculateNeighborsData() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (boardData[r][c].isMine) continue;

            let mines = 0;
            // (-1, -1) top-left, (0, 0) actual cell , (1, 1) is bottom-right
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const nr = r + dr;
                    const nc = c + dc;
                    // If the valid neighbor is a mine, increase our counter
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                        if (boardData[nr][nc].isMine) mines++;
                    }
                }
            }
            boardData[r][c].neighborMines = mines;
        }
    }
}