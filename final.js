const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector('#statusText');
const note = document.querySelector("#note");
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X"; 
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}`;

    running = true;
}



function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}`;
    note.textContent = "Hãy chiến đấu hết mình!"
}

function checkWinner() {
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        
        if(cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        note.textContent = `${currentPlayer} đã chiến thắng! Bấm chơi lại để bắt đầu lại!`
        running = false;
    } else if (!options.includes("")) {
        note.textContent = `Chưa có người chiến thắng. Bấm chơi lại để bắt đầu lại!`
        running = false;
    } else { 
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    note.textContent = "Hãy chiến đấu hết mình!"
}