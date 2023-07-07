// Store the current player and game state
let currentPlayer = "x";
let gameActive = true;

// Get all the necessary elements
const cells = document.querySelectorAll(".grid-cell");
const currentPlayerDisplay = document.querySelector(".current-player");
const gameOverText = document.querySelector(".game-over-text");
const restartButton = document.querySelector(".restart");

// Function to handle cell click event
function handleCellClick(event) {
  const cell = event.target;

  // Check if the cell is already marked or the game is over
  if (cell.textContent === "" && gameActive) {
    // Mark the cell with the current player's symbol
    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer.toUpperCase();

    // Check for a winning condition
    if (checkWin()) {
      endGame(`${currentPlayer.toUpperCase()} wins!`);
    } else if (checkDraw()) {
      // Check for a draw condition

      endGame("Draw!");
    } else {
      // Switch to the next player
      currentPlayer = currentPlayer === "x" ? "o" : "x";
      console.log("currently player is", currentPlayer);
      currentPlayerDisplay.textContent = `Its ${currentPlayer.toUpperCase()} turn`;
    }
  }
}

// Function to check for a winning condition
function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].textContent === currentPlayer.toUpperCase() &&
      cells[b].textContent === currentPlayer.toUpperCase() &&
      cells[c].textContent === currentPlayer.toUpperCase()
    ) {
      return true;
    }
  }

  return false;
}

// Function to check for a draw condition
function checkDraw() {
  for (let cell of cells) {
    if (cell.textContent === "") {
      return false;
    }
  }
  return true;
}

// Function to end the game
function endGame(result) {
  gameActive = false;
  gameOverText.textContent = result;
  for (let cell of cells) {
    cell.classList.add("disabled");
  }
}

// Function to reset the game
function restartGame() {
  currentPlayer = "x";
  gameActive = true;
  currentPlayerDisplay.textContent = `Its ${currentPlayer.toUpperCase()} turn`;
  gameOverText.textContent = "";

  for (let cell of cells) {
    cell.classList.remove("x", "o", "disabled");
    cell.textContent = "";
  }
}

// Add event listeners
for (let cell of cells) {
  cell.addEventListener("click", handleCellClick);
}

restartButton.addEventListener("click", restartGame);
