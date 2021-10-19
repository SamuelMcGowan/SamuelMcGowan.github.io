class Canvas {
    constructor(width, height, blockSize) {
        this.canvas = document.getElementById('game-canvas');
        this.context = this.canvas.getContext('2d');

        this.setSize(width, height, blockSize);

        this.setFont();
    }

    setSize(width, height, blockSize) {
        this.width = width;
        this.height = height;
        this.blockSize = blockSize;

        this.totalCells = width * height;

        this.canvas.width = width * blockSize;
        this.canvas.height = height * blockSize;
    }

    setFont() {
        this.context.font = '20px Work Sans';
        this.context.textBaseline = 'middle';
        this.context.textAlign = 'center';
    }

    clear() {
        this.context.clearRect(
            0, 0,
            this.canvas.width,
            this.canvas.height
        )
    }

    drawCell(cell) {
        this.context.fillRect(
            cell.x * this.blockSize,
            cell.y * this.blockSize,
            this.blockSize,
            this.blockSize
        )
    }

    message(s) {
        this.setFillStyle('#E6D9D1')
        this.context.fillText(
            s,
            this.canvas.width / 2,
            this.canvas.height / 2
        );
    }

    setFillStyle(s) {
        this.context.fillStyle = s;
    }
}


class Game {
    constructor(refreshRate) {
        this.snake = []
        this.snake.push({x: 0, y: 0});

        this.nextDirection = 1;
        this.lastDirection = 1;

        this.eating = 9;

        this.apple = this.randomCell();

        this.gameOver = false;
        this.gameOverMsg = null; // not sure what the convention is

        document.onkeydown = (e) => this.keydown.call(this, e);
        this.interval = setInterval(() => this.loop.call(this), refreshRate);
    }

    cleanUp() {
        document.onkeydown = null;
        clearInterval(this.interval);
    }

    randomCell() {
        let x = Math.floor(Math.random() * canvas.width);
        let y = Math.floor(Math.random() * canvas.height);

        return {x: x, y: y};
    }

    keydown(e) {
        let direction;
        
        if (e.which === 87 || e.which === 38) {
            direction = 0; // up
        } else if (e.which === 83 || e.which === 40) {
            direction = 2; // down
        } else if (e.which === 65 || e.which === 37) {
            direction = 3; // left
        } else if (e.which === 68 || e.which === 39) {
            direction = 1; // right
        } else {
            return;
        }

        if (this.lastDirection === (direction+2)%4) { // opposite direction
            return;
        }

        this.nextDirection = direction;
    }

    loop() {
        let vector = this.getDirection();
        this.moveSnake(vector.x, vector.y);

        if (this.gameOver === true) {
            canvas.clear();
            canvas.message(this.gameOverMsg);
            this.cleanUp();
            return;
        }

        canvas.clear();
        this.drawApple();
        this.drawSnake();
    }

    getDirection() {
        let x = 0;
        let y = 0;

        switch (this.nextDirection) {
            case 0: // up
                y = -1;
                break;
            case 1: // right
                x = 1;
                break;
            case 2: // down
                y = 1;
                break;
            case 3: // left
                x = -1;
                break;
        }

        this.lastDirection = this.nextDirection;

        return {x: x, y: y};
    }

    moveSnake(x, y) {
        let lastCell = this.snake[this.snake.length - 1];

        let nextX = lastCell.x + x;
        let nextY = lastCell.y + y;

        if (this.cellInSnake(nextX, nextY)) {
            this.gameOver = true;
            this.gameOverMsg = `You went into yourself. Your final length was ${this.snake.length}.`
            return;
        }

        if (
            nextX < 0 || nextX >= canvas.width ||
            nextY < 0 || nextY >= canvas.height
        ) {
            this.gameOver = true;
            this.gameOverMsg = `You hit an edge. Your final length was ${this.snake.length}.`;
            return;
        }

        if (nextX === this.apple.x && nextY === this.apple.y) {
            this.eating += 5;
            this.apple = this.randomCell();
        }

        this.snake.push({x: nextX, y: nextY});

        if (this.eating > 0) {
            this.eating -= 1;
        } else {
            this.snake.splice(0, 1);
        }

        if (this.snake.length === canvas.totalCells) {
            this.gameOver = true;
            this.gameOverMsg = `You win! ${this.snake.length} long, well done!`;
        }
    }

    cellInSnake(x, y) {
        for (let i = 0; i < this.snake.length; i++) {
            let cell = this.snake[i];
            if (cell.x === x && cell.y === y) {
                return true;
            }
        }
        return false;
    }

    drawSnake() {
        canvas.setFillStyle('#E6D9D1');
        for (let i = 0; i < this.snake.length; i++) {
            canvas.drawCell(this.snake[i]);
        }
    }

    drawApple() {
        canvas.setFillStyle('#E64B2C');
        canvas.drawCell(this.apple);
    }
}


var canvas;
var game;

function setup() {
    canvas = new Canvas(30, 30, 15);
    game = null;
}

function newGame() {
    if (game !== null) {
        game.cleanUp();
    }
    game = new Game(100);
}