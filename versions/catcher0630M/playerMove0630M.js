function player1(e){
  switch (e.keyCode) {
    case 37:
      controlPlayerMovement("horizontal",-1,"player");
      break;
    case 38:
      controlPlayerMovement("vertical",-1,"player");
      break;
    case 39:
      controlPlayerMovement("horizontal",1,"player");
      break;
    case 40:
      controlPlayerMovement("vertical",1,"player");
    default:
      break;
  }
}

function player2(e){
  if(Player2) {
    switch (e.keyCode) {
      case 65:
        controlPlayerMovement("horizontal",-1,"rival");
        break;
      case 87:
        controlPlayerMovement("vertical",-1,"rival");
        break;
      case 68:
        controlPlayerMovement("horizontal",1,"rival");
        break;
      case 83:
        controlPlayerMovement("vertical",1,"rival");
      default:
        break;
    }
  }
}

function controlPlayerMovement(axis,movement,type) {
  let playerYX = findPlayer(type);
  let playerY = playerYX[0];
  let playerX = playerYX[1];
  switch (axis) {
    case "horizontal":
      let newX = playerX+movement
      if(newX >= 0 && newX < 20) {
        let newCoordinate = gameTable[playerY][newX];
        if(playerMoveBlockControl(newCoordinate,type)) {
          makePlayerMove(gameTable[playerY][playerX],newCoordinate,findOldClass(newCoordinate),type);
        }
      }
      break;
    case "vertical":
      let newY = playerY+movement;
      if(newY >= 0 && newY < 20) {
        let newCoordinate = gameTable[newY][playerX];
        if(playerMoveBlockControl(newCoordinate,type)) {
          makePlayerMove(gameTable[playerY][playerX],newCoordinate,findOldClass(newCoordinate),type);
        }
      }
      break;
  }
}

function findOldClass(block,type) {
  return block[0].getAttribute("class");
}

function playerMoveBlockControl(block,type) {
  switch (block[1]) {
    case undefined:
      return true;
      break;
    case "target":
      if (type=="player") {
        player1Win();
      } else {
        player2Win();
      }
      clickButton();
      break;
    default: break;
  }
}

function makePlayerMove(oldCoordinate, newCoordinate,oldClass,type){
  oldCoordinate[0].classList.remove(type);
  oldCoordinate[0].classList.add("undefined");
  newCoordinate[0].classList.remove(oldClass);
  newCoordinate[0].classList.add(type);
  oldCoordinate[1]=undefined;
  newCoordinate[1]=type;
}

function findPlayer(player){
  for (let y in gameTable) {
    for (let x in gameTable[y]) {
      if(gameTable[y][x][1]==player) {
        return ([Number(y),Number(x)])
      }
    }
  }
}

function setPlayer2(x){
  Player2 = x;
}

let Player2;
let moves = [];
window.addEventListener("keydown",function(e){
  let checkMove=true;
  for (let move in moves) {
    if (moves[move].keyCode==e.keyCode){
      checkMove = false;
    }
  }
  if(checkMove){
    moves.push(e);
    player1(e);
    player2(e);
  }
});

window.addEventListener("keyup",function(e){
  for (let move in moves) {
    if (moves[move].keyCode==e.keyCode){
      moves.splice(move,1);
    }
  }
});

window.EventListener('swiped-left', function(){
    controlPlayerMovement("horizontal",-1,"player");
});
window.EventListener('swiped-up', function(){
    controlPlayerMovement("vertical",-1,"player");
});
window.EventListener('swiped-right', function(){
    controlPlayerMovement("horizontal",1,"player");
});
window.EventListener('swiped-down', function(){
    controlPlayerMovement("vertical",1,"player");
});
