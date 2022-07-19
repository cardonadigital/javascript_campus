(function(){
    /**
     * Pizarron donde se ejecutara el juego
     * propiedades necesarias para el juego
     * @param {*} width 
     * @param {*} height 
     */
    self.Board = function (width, height) {
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    /**
     * retornar barra y pelota del juego
     */
    self.Board.prototype = {
        get elements() {
            let elements = this.bars;
            elements.push(this.ball);
            return elements;
        }
    }


})();

/**
 * setear el board
 */
(function(){
    self.BoardView = function(canvas, board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }
}());

/**
 * ejecutar main
 */
window.addEventListener("load", main);

function main(){
 var board = new Board(900, 500);
 var canvas = document.getElementById('canvas');
 var boardview = new BoardView(canvas, board);
}