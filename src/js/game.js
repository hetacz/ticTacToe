import { X, O, EMPTY_BOARD, MAX_DEPTH } from './config.js';

class Game {
    #board;
    #maxDepth;
    #random;
    constructor(gameBoard, maxDepth, randomizeEqualMoves) {
        this.#board = gameBoard;
        this.#maxDepth = maxDepth;
        this.#random = randomizeEqualMoves;
    }
    move(n, player) {
        if (this.board[n] === X || this.board[n] === O) { return; }
        if (player === X) { this.#board[n] = X; }
        if (player === O) { this.#board[n] = O; }
        return this.board;
    }
    resetBoard() {
        this.#board = Array.from(EMPTY_BOARD);
        return this.board;
    }
    get maxDepth() {
        return this.#maxDepth;
    }
    set maxDepth(newMaxDepth) {
        this.#maxDepth = newMaxDepth;
    }
    get board() {
        return this.#board;
    }
    makeFirstMove() {
        return Math.floor(Math.random() * 9);
    }
    #getOpponent(player) {
        return player === X ? O : X;
    }
    getEmptyTiles() {
        return this.board.filter((tile) => {
            return (tile !== X && tile !== O);
        });
    }
    winCondition(player) {
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
    evaluate(player, depth = 0) {
        if (this.winCondition(X)) { return { score: 10 - depth }; }
        else if (this.winCondition(O)) { return { score: -10 + depth }; }
        else if (this.getEmptyTiles().length === 0) { return { score: 0 }; }
        else if (depth === this.#maxDepth) { return { score: 0 }; }
        console.log('Empty Tiles', this.getEmptyTiles());

        const moves = [];
        this.getEmptyTiles().forEach((tile) => {
            const move = {};
            move.player = player;
            move.tile = tile;
            this.board[tile] = player; // make a move
            move.depth = depth;
            console.log(player + ' on: ' + tile);
            console.table(this.board);
            move.score = this.evaluate(this.#getOpponent(player), depth + 1).score; // evaluate
            this.board[tile] = move.tile; // take move back
            moves.push(move);
        });
        console.log('moves :>> ', moves);

        let bestMove;
        if (player === X) {
            let highScore = Number.NEGATIVE_INFINITY;
            for (const move of moves) {
                if (this.#random && move.score === highScore && this.#randomBool()) { bestMove = move; }
                if (move.score > highScore) {
                    highScore = move.score;
                    bestMove = move;
                }
            }
        } else {
            let highScore = Number.POSITIVE_INFINITY;
            for (const move of moves) {
                if (this.#random && move.score === highScore && this.#randomBool()) { bestMove = move; }
                if (move.score < highScore) {
                    highScore = move.score;
                    bestMove = move;
                }
            }
        }
        console.log('bestMove :>> ', bestMove);
        return bestMove;
    }
    #randomBool() {
        return Math.floor(Math.random() * 2) === 1 ? true : false;
    }
}

export default new Game(EMPTY_BOARD, MAX_DEPTH, true);
