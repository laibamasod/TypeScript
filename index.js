var TicTacToe = /** @class */ (function () {
    function TicTacToe() {
        this.board = Array(9);
        for (var i = 0; i < 9; i++) {
            this.board[i] = null;
        }
        this.currentPlayer = 'X';
    }
    TicTacToe.prototype.makeMove = function (index) {
        if (this.board[index] === null) {
            this.board[index] = this.currentPlayer;
            return true; //move done
        }
        return false; //move not allowed if box occupied
    };
    TicTacToe.prototype.switchPlayer = function () {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    };
    TicTacToe.prototype.checkWin = function () {
        var winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        for (var _i = 0, winningCombos_1 = winningCombos; _i < winningCombos_1.length; _i++) {
            var combo = winningCombos_1[_i];
            var a = combo[0], b = combo[1], c = combo[2];
            if (this.board[a] && // box isnt null
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]) {
                return true; // Return true if there's a winning combination
            }
        }
        return false; // Return false if no winner
    };
    TicTacToe.prototype.checkDraw = function () {
        return this.board.every(function (cell) { return cell !== null; }); // True if all cells are filled
    };
    TicTacToe.prototype.resetGame = function () {
        for (var i = 0; i < 9; i++) {
            this.board[i] = null;
        } // Reset all cells to null
        boxes.forEach(function (box) { return (box.textContent = ""); }); // Clear the UI
        this.currentPlayer = 'X';
        winner.textContent = ""; // Clear the winner message
        player.textContent = game.currentPlayer; // Reset player display
    };
    return TicTacToe;
}());
var game = new TicTacToe();
var boxes = document.querySelectorAll('.box');
var btn = document.querySelector(".reset-btn");
var player = document.getElementById("player");
var winner = document.getElementById("winner");
player.textContent = game.currentPlayer;
btn.addEventListener('click', function () {
    game.resetGame();
});
boxes.forEach(function (box) {
    box.addEventListener('click', function () {
        var index = parseInt(box.getAttribute('data-index'));
        if (game.makeMove(index)) {
            box.textContent = game.currentPlayer;
            if (game.checkWin()) {
                winner.textContent = "".concat(game.currentPlayer, " wins!");
                setTimeout(function () {
                    game.resetGame();
                }, 2000);
            }
            else if (game.checkDraw()) {
                winner.textContent = "It's a draw!";
                setTimeout(function () {
                    game.resetGame();
                }, 2000);
            }
            else {
                game.switchPlayer();
            }
            player.textContent = game.currentPlayer;
        }
    });
});
