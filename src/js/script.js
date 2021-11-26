'use strict';

//@ts-check
/* eslint-disable */
const X = 'x';
const O = 'o';
const EMPTY_BOARD = Array.from({ length: 8 }, (_, k) => k);

class Game {

    #counter;
    #aiPlayer;
    #board;

    constructor(aiPlayer, gameBoard) {
        // menu here?
        this.#aiPlayer = aiPlayer;
        this.#board = gameBoard;
        this.#counter = 0;
        this.#getEmptyTiles();
        this.#evaluate(this.aiPlayer);
    }

    get aiPlayer() {
        return this.#aiPlayer;
    }

    get enemy() {
        return this.aiPlayer === X ? O : X;
    }

    get board() {
        return this.#board;
    }

    // get counter() {return this.#counter;}
    #count() {
        console.log('this.#counter :>> ', this.#counter);
        return ++this.#counter;
    }
    // #resetCounter() {return this.#counter = 0;}

    #selectBestMove(player, moves) {
        let bestMove;
        if (player === this.aiPlayer) {
            let highScore = Number.NEGATIVE_INFINITY;
            for (const move of moves) {
                if (move.score > highScore) {
                    highScore = move.score;
                    bestMove = move;
                }
            }
        } else {
            let highScore = Number.POSITIVE_INFINITY;
            for (const move of moves) {
                if (move.score < highScore) {
                    highScore = move.score;
                    bestMove = move;
                }
            }
        }
        console.log('bestMove :>> ', bestMove);
        return bestMove;
    }

    #getEmptyTiles() {
        return this.board.filter((tile) => {
            return (tile !== X && tile !== O);
        });
    }

    #winCondition(player) {
        if (this.board[0] === player && this.board[1] === player && this.board[2] === player) { return true; }
        if (this.board[3] === player && this.board[4] === player && this.board[5] === player) { return true; }
        if (this.board[6] === player && this.board[7] === player && this.board[8] === player) { return true; }
        if (this.board[0] === player && this.board[3] === player && this.board[6] === player) { return true; }
        if (this.board[1] === player && this.board[4] === player && this.board[7] === player) { return true; }
        if (this.board[2] === player && this.board[5] === player && this.board[8] === player) { return true; }
        if (this.board[0] === player && this.board[4] === player && this.board[8] === player) { return true; }
        if (this.board[2] === player && this.board[4] === player && this.board[6] === player) { return true; }
        return false;
    }

    #evaluate(player) {
        console.log('depth :>> ', this.#count());
        if (this.#winCondition(this.aiPlayer)) { return { score: 10 }; }
        else if (this.#winCondition(this.enemy)) { return { score: -10 }; }
        else if (this.#getEmptyTiles().length === 0) { return { score: 0 }; }

        console.log('Empty Tiles', this.#getEmptyTiles());
        return this.#selectBestMove(player, this.#getPossibleMoves(player));
    }

    #getPossibleMoves(player) {
        const moves = [];
        this.#getEmptyTiles().forEach((tile) => {
            const move = {};
            move.player = player;
            move.tile = tile;
            this.#board[tile] = player; // make a move
            console.log(player + ' on: ' + tile);
            console.table(this.board);
            move.score = this.#evaluate(this.enemy).score; // evaluate
            this.board[tile] = move.tile; // take move back
            moves.push(move);
        });
        console.log('moves :>> ', moves);
        return moves;
    }
}

//=========================================================================================================
const gameBoard = [O, 1, X, X, 4, X, 6, O, O]; // zrób mapę 00 01 02 itd
console.table(gameBoard);
new Game(X, gameBoard);