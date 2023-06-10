// QuerySelectors
var playerOneWins = document.getElementById("#playerOneWinCount");
var playerTwoWins = document.getElementById("#playerTwoWinCount");
var gridContainer = document.querySelector(".grid-container");
var gridSquares = document.querySelectorAll(".grid-square");

// EventListeners
gridContainer.addEventListener("click", placeToken);

// Global Variables
var playerOne = createPlayer(1, "🏄🏼‍♂️");
var playerTwo = createPlayer(2, "🌊");
var currentPlayer = playerOne;
var gameBoard = ["", "", "", "", "", "", "", "", ""];
var winningCombo = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Functions
function createPlayer(id, token) {
  return {
    id: id,
    token: token,
    wins: 0,
    isTurn: true || false,
    // MOVES []??
  };
}

function increaseWins(player) {
  player.wins += 1;
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

