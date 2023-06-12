// QuerySelectors
var playerOneWins = document.getElementById("playerOneWinCount");
var playerTwoWins = document.getElementById("playerTwoWinCount");
var gridContainer = document.querySelector(".grid-container");
var gridSquares = document.querySelectorAll(".grid-square");
var playerMessage = document.getElementById("playerMessage");

// EventListeners
gridContainer.addEventListener("click", function (event) {
  if (valid(event)) {
    placeToken(event);
    switchPlayer();
  }
  if (checkForWins(event)) {
    resetGame();
    return;
  } else if (detectDraw()) {
    resetGame();
    return;
  }
});

// Global Variables
var playerOne = createPlayer(1, "🏄🏼‍♂️");
var playerTwo = createPlayer(2, "🌊");
var currentPlayer = playerOne;
var gameBoard = ["", "", "", "", "", "", "", "", ""];
var isGameOver = false;
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
  player.wins += 1;
}

function checkForWins(event) {
  for (var i = 0; i < winningCombos.length; i++) {
    var winCombo = winningCombos[i];

    var playerOneWin = winCombo.every(function (position) {
      return playerOne.moves.includes(position);
    });
    var playerTwoWin = winCombo.every(function (position) {
      return playerTwo.moves.includes(position);
    });

    if (playerOneWin) {
      playerOne.wins += 1;
      playerOneWins.innerText = playerOne.wins + "wins";
      playerMessage.innerText = "Player One Wins!!";
      // isGameOver = true
      return true;
    } else if (playerTwoWin) {
      playerTwo.wins += 1;
      playerTwoWins.innerText = playerTwo.wins + "wins";
      playerMessage.innerText = "Player Two Wins!!";
      // isGameOver = true;
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
