import * as sel from './selectors.js';
import { X, O } from './config.js';

class Render {
    resetBoard() {
        sel.cells.forEach((el) => {
            el.innerHTML = ' ';
            el.classList = 'cell';
        });
    }
    printBoard(board) {
        sel.cells.forEach((cell) => {
            cell.classList.remove('suggest');
        });
        board.forEach((el, i) => {
            if (el === X) { sel.cells[i].classList.add('cross'); }
            if (el === O) { sel.cells[i].classList.add('circle'); }
        });
    }
    paintWinner(player) {
        sel.cells.forEach((cell) => {
            if (player === X && cell.classList.contains('cross')) { cell.classList.add('green'); }
            if (player === O && cell.classList.contains('circle')) { cell.classList.add('red'); }
        });
        sel.statusBar.textContent = player === X ? 'Cross wins' : 'Circle wins';
    }
    paintDraw() {
        sel.cells.forEach((cell, i) => i % 2 === 0 ? cell.classList.add('green') : cell.classList.add('red'));
        sel.statusBar.textContent = 'Draw';
    }
    suggestedMove(tile) {
        sel.cells[tile].classList.add('suggest');
    }
}

export default new Render();