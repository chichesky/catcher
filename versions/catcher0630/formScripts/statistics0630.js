function setStatistics() {
  playedGame.innerHTML = gameNumber-1;
  player1Wins.innerHTML = playerWin;
  player2Wins.innerHTML = playerRivalWin;
}

function getGameNumber() {
  addGame();
  setStatistics();
  return gameNumber;
}
function addGame() {
  gameNumber ++;
}
function player1Win() {
  playerWin ++;
}
function player2Win() {
  playerRivalWin ++;
}


let playerWin = 0;
let playerRivalWin = 0;
let gameNumber = 0;

const playedGame = document.getElementById("playedGame");
const player1Wins = document.getElementById("player1Wins");
const player2Wins = document.getElementById("player2Wins");
