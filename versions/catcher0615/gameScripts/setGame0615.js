function startGame(wallNumber) {
  if (gameNumber != 0) {
    reSetDivs();
    setDivs();
  } else {
    setDivs();
  }
  setBlocks("wall",wallNumber[0],wallNumber[1]);
  setBlocks("rival",1,1);
  setBlocks("enemy",1,1);
  setBlocks("target",1,1);
  setBlocks("player",1,1);
  gameNumber++;
}

function reSetDivs() {
  for (let y in gameTable) {
    for (let x in gameTable) {
      gameTable[y][x][0].remove();
    }
  }
  gameTable=[];
}

function setDivs() {
  const gameArea = document.getElementsByTagName('content')[0];
  for (let y = 0; y < 20; y++) {
    let horizontal = [];
    for(let x = 0; x < 20; x++) {
      let divCreation = document.createElement('div');

      gameArea.appendChild(divCreation);
      horizontal.push([divCreation,undefined,undefined]);
    }
  gameTable.push(horizontal);
  }
}

function setBlocks(blockType,max,min) {
  for (let counter = 0; counter < random(max,min); counter++) {
    let y;
    let x;
    do {
      y = random(20);
      x = random(20);
    } while(gameTable[y][x][1] != undefined);

    gameTable[y][x][1] = blockType;
    gameTable[y][x][0].classList.add(gameTable[y][x][1]);
  };
}

function random(max,min) {
  switch (min) {
    case undefined:
      return Math.floor(Math.random()*max);
      break;
    default:
      return Math.floor(Math.random()*(max-min+1) + min);
  }
}

var gameNumber = 0;
var gameTable=[]
