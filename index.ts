type Player = 'X' | 'O';
type Box = Player | null;

class TicTacToe {
    private board: Box[];
    public currentPlayer: Player;

    constructor() {
        this.board = Array(9);
        for (let i = 0; i < 9; i++) {
            this.board[i] = null;
        }
        this.currentPlayer = 'X';
    }

    public makeMove(index: number): boolean {
        if (this.board[index] === null) {
            this.board[index] = this.currentPlayer;
            return true;   //move done
        }
        return false;   //move not allowed if box occupied
    }

    public switchPlayer(): void {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    public checkWin(): boolean {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (
                this.board[a] &&        // box isnt null
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]
            ) {
                return true;  // Return true if there's a winning combination
            }
        }
        return false;          // Return false if no winner
    }

    public checkDraw(): boolean {
        return this.board.every(cell => cell !== null); // True if all cells are filled
    }

    public resetGame(): void {
        for (let i = 0; i < 9; i++) {
            this.board[i] = null;
        }  // Reset all cells to null

        boxes.forEach(box => (box.textContent = "")); // Clear the UI
        this.currentPlayer = 'X';
        winner.textContent = ""; // Clear the winner message
        player.textContent = game.currentPlayer; // Reset player display
    }

}
const game = new TicTacToe();
const boxes = document.querySelectorAll('.box');
const btn = document.querySelector(".reset-btn")!;
const player = document.getElementById("player")!;
const winner = document.getElementById("winner")!;


player.textContent = game.currentPlayer;

btn.addEventListener('click', () => {
    game.resetGame();

});

boxes.forEach(box => {
    box.addEventListener('click', () => {
        const index = parseInt(box.getAttribute('data-index')!);
        if (game.makeMove(index)) {
            box.textContent = game.currentPlayer;
            if (game.checkWin()) {
                winner.textContent = `${game.currentPlayer} wins!`;
                setTimeout(() => {
                    game.resetGame();

                }, 2000);


            }
            else if (game.checkDraw()) {
                winner.textContent = "It's a draw!";

                setTimeout(() => {
                    game.resetGame();

                }, 2000);
            } else {

                game.switchPlayer();
            }
            player.textContent = game.currentPlayer;
        }
    });
});
