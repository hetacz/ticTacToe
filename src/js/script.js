'use strict';

import { O, X } from './config.js';
import game from './game.js';
import render from './render.js';
import * as sel from './selectors.js';

class App {
    #activeGame = false;
    #aiPlayer = O;
    #title = 'TicTacToe';
    constructor() {
        this.#initialView();
        sel.gameGrid.addEventListener('click', this.#makeMove.bind(this));
        sel.playAsX.addEventListener('click', this.#playAsX.bind(this));
        sel.playAsO.addEventListener('click', this.#playAsO.bind(this));
    }
    get humanPlayer() {
        return this.#aiPlayer === X ? O : X;
    }
    #initialView() {
        sel.cells.forEach((el, i) => {
            el.innerHTML = this.#title[i];
            el.classList = 'cell';
        });
        sel.statusBar.textContent = 'Start a game as Cross or Circle, Cross moves first.';
        return this;
    }
    #makeMove(ev) {
        console.log(ev.target.dataset.id);
        if (!ev.target.classList.contains('cell')) { return; }
        if (!this.#activeGame) { return; }
        if (game.getEmptyTiles().includes(ev.target.dataset.id)) { return; }
        this.#activateSuggestion();
        game.move(ev.target.dataset.id, this.humanPlayer);
        render.printBoard(game.board);
        this.#checkForTerminal(this.humanPlayer);
        game.move(game.evaluate(this.#aiPlayer).tile, this.#aiPlayer);
        render.printBoard(game.board);
        this.#checkForTerminal(this.#aiPlayer);
        return this;

    }
    #playAsX(ev) {
        console.log('ev :>> ', ev);
        game.resetBoard();
        render.resetBoard();
        this.#aiPlayer = O;
        this.#activeGame = true;
        sel.statusBar.textContent = 'You play as Cross';
        this.#activateSuggestion();
        return this;
    }
    #playAsO(ev) {
        console.log('ev :>> ', ev);
        game.resetBoard();
        render.resetBoard();
        this.#aiPlayer = X;
        this.#activeGame = true;
        game.move(game.makeFirstMove(), this.#aiPlayer);
        render.printBoard(game.board);
        sel.statusBar.textContent = 'You play as Circle';
        this.#activateSuggestion();
        return this;
    }
    #suggestMove(ev) {
        console.log('ev :>> ', ev);
        this.#deactivateSuggestion();
        render.suggestedMove(game.evaluate(this.humanPlayer).tile);
        return this;
    }
    #checkForTerminal(player) {
        if (game.winCondition(player)) {
            this.#activeGame = false;
            this.#deactivateSuggestion();
            render.paintWinner(player);
        } else if (game.getEmptyTiles().length === 0) {
            this.#activeGame = false;
            this.#deactivateSuggestion();
            render.paintDraw();
        }
        return this;
    }
    #activateSuggestion() {
        sel.suggestMove.classList.remove('disabled');
        sel.suggestMove.addEventListener('click', this.#suggestMove.bind(this));
        return this;
    }
    #deactivateSuggestion() {
        sel.suggestMove.classList.add('disabled');
        sel.suggestMove.removeEventListener('click', this.#suggestMove);
        return this;
    }
}

new App();