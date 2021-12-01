import * as sel from './selectors.js';
import { X, O } from './config.js';

class Render {
    initialView() {
        sel.cells.forEach((el, i) => {
            el.innerHTML = 'TicTacToe'[i];
            el.classList = 'cell';
        });
        sel.statusBar.textContent = 'Start a game as Cross or Circle, Cross moves first.';
        return this;
    }
    addInitialHandlers(makeMove, playAsX, playAsO) {
        sel.gameGrid.addEventListener('click', makeMove);
        sel.playAsX.addEventListener('click', playAsX);
        sel.playAsO.addEventListener('click', playAsO);
    }
    resetBoard() {
        sel.cells.forEach((el) => {
            el.innerHTML = ' ';
            el.classList = 'cell';
        });
        return this;
    }
    printBoard(board) {
        board.forEach((el, i) => {
            if (el === X) { sel.cells[i].classList.add('cross'); }
            if (el === O) { sel.cells[i].classList.add('circle'); }
        });
        return this;
    }
    paintWinner(player) {
        sel.cells.forEach((cell) => {
            if (player === X && cell.classList.contains('cross')) { cell.classList.add('green'); }
            if (player === O && cell.classList.contains('circle')) { cell.classList.add('red'); }
        });
        sel.statusBar.textContent = player === X ? 'Cross wins' : 'Circle wins';
        return this;
    }
    paintDraw() {
        sel.cells.forEach((cell, i) => i % 2 === 0 ? cell.classList.add('green') : cell.classList.add('red'));
        sel.statusBar.textContent = 'Draw';
        return this;
    }
    playAsX() {
        sel.statusBar.textContent = 'You play as a Cross';
        return this;
    }
    playAsO() {
        sel.statusBar.textContent = 'You play as a Circle';
        return this;
    }
}

export default new Render();