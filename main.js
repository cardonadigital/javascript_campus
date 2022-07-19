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
 * setear las barras
 */
(function(){
    self.Bar = function(X,Y,width,height, board){
        this.x = X;
        this.y = Y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = 'rectangle';
        this.speed = 10;
    }

    self.Bar.prototype = {
        down: function () {
            this.y += this.speed;
        },
        up: function () {
            this.y -= this.speed;
        },
        toString: function(){
            return "x: "+ this.x + "y: "+ this.y;
        }
    }
}());

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

    self.BoardView.prototype = {
        draw: function () {
            for (let i = this.board.elements.length - 1; i >= 0; i--) {
                let el = this.board.elements[i];
                draw(this.ctx, el);
            }
        }
    }

    function draw(ctx, element) {
        if (element !== null && element.hasOwnProperty("kind")) {
            switch (element.kind) {
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.height, element.width);
                    break;
            }
        }
    }
}());

/**
 * create objects bars and select canvas
 */
let board = new Board(900, 500);
var bar = new Bar(30, 150, 200, 30, board);
var bar = new Bar(830, 150, 200, 30, board);
let canvas = document.getElementById('canvas');
let board_view = new BoardView(canvas, board);

/**
 * read when up or down key is pressed
 */
document.addEventListener("keydown", function (ev) {
    if (ev.keyCode == 38) {
        bar.up();
        console.log(ev.keyCode);
    }
    else if (ev.keyCode == 40) {
        bar.down();
        console.log(ev.keyCode);
    }

});


self.addEventListener("load", main);
function main() {

    board_view.draw();
}