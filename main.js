// QuerySelectors
var gridContainer = document.querySelector(".grid-container");
var gridSquares = document.querySelectorAll(".grid-square");
var playerMessage = document.getElementById("playerMessage");

// EventListeners
gridContainer.addEventListener("click", function (event) {
  var isMoveValid = checkValidMove(event) && !isGameOver;
  if (isMoveValid) {
    placeToken(event);
  }

  if (checkForWins(event) && !isGameOver) {
    var playerWins = document.querySelector(`.${currentPlayer.id}`);
    currentPlayer.wins += 1;
    playerWins.innerText = currentPlayer.wins + " " + "wins";
    playerMessage.innerText = `Player ${currentPlayer.id}  Wins!!`;
    isGameOver = true;
    resetGame();
    return;
  } else if (detectDraw()) {
    resetGame();
    return;
  } else if (isMoveValid) {
    switchPlayer();
    displayCurrentPlayerTurn();
  }
});

// Global Variables
var playerOne = createPlayer("One", "🏄🏼‍♂️");
var playerTwo = createPlayer("Two", "🌊");
var currentPlayer = playerOne;
var gameBoard = ["", "", "", "", "", "", "", "", ""];
var isGameOver = false;
var playerOnStart = playerOne;
var winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Functions
function createPlayer(id, token) {
  return {
    id: id,
    token: token,
    wins: 0,
    isTurn: true,
    moves: [],
  };
}

function increaseWins(player) {
  player.wins++;
}

function checkForWins(event) {
  for (var i = 0; i < winningCombos.length; i++) {
    var winCombo = winningCombos[i];
    var isWin = winCombo.every(function (position) {
      return currentPlayer.moves.includes(position);
    });
    if (isWin) {
      return true;
    }
  }
  return false;
}

function gameBoardData() {
  var board = [];

  for (var i = 0; i < 3; i++) {
    var row = [];

    row.push("");
    row.push("");
    row.push("");

    board.push(row);
  }
  return board;
}

function placeToken(event) {
  var clickSquare = Array.from(gridSquares).indexOf(event.target);
  if (gameBoard[clickSquare] === "") {
    gameBoard[clickSquare] = currentPlayer.token;
    event.target.textContent = currentPlayer.token;
    currentPlayer.moves.push(clickSquare);
  }
}

function displayCurrentPlayerTurn() {
  if (currentPlayer === playerOne) {
    playerMessage.innerText = `It\'s ${playerOne.token}\'s turn!`;
  } else {
    playerMessage.innerText = `It\'s ${playerTwo.token}\'s turn!`;
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
}

function detectDraw() {
  if (gameBoard.includes("")) {
    return false;
  } else {
    playerMessage.innerText = "It's a Draw!";
  }
  isGameOver = true;
  return true;
}

function checkValidMove(event) {
  var gridNumber = parseInt(event.target.id);
  if (gameBoard[gridNumber] === "") {
    return true;
  } else {
    return false;
  }
}

function resetGame() {
  if (checkForWins() === true || detectDraw() === true) {
    setTimeout(function () {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      playerOne.moves = [];
      playerTwo.moves = [];
      isGameOver = false;
      for (var i = 0; i < gridSquares.length; i++) {
        gridSquares[i].textContent = "";
      }
      playerOnStart = 
      displayCurrentPlayerTurn();
    }, 2000);
  }
}

