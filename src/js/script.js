'use strict';

import { O, X } from './config.js';
import game from './game.js';
import render from './render.js';

class App {
    #activeGame = false;
    #aiPlayer = O;
    constructor() {
        render.initialView();
        render.addInitialHandlers(this.#makeMove.bind(this), this.#playAsX.bind(this), this.#playAsO.bind(this));
    }
    get humanPlayer() {
        return this.#aiPlayer === X ? O : X;
    }
    #makeMove(ev) {
        console.log(ev.target.dataset.id);
        if (!this.#activeGame) { return; }
        if (!ev.target.classList.contains('cell')) { return; }
        if (ev.target.classList.contains('cross')) { return; }
        if (ev.target.classList.contains('circle')) { return; }
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
        render.playAsX();
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
        render.playAsO();
        return this;
    }
    #checkForTerminal(player) {
        if (game.winCondition(player)) {
            this.#activeGame = false;
            render.paintWinner(player);
        } else if (game.getEmptyTiles().length === 0) {
            this.#activeGame = false;
            render.paintDraw();
        }
        return this;
    }
}

new App();