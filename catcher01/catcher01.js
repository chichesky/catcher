function createMap() {
  for(let y = 0; y < 20; y++) {
    for(let x = 0; x < 20; x++) {
      const myDiv = document.createElement('div');
      myDiv.setAttribute('id',x+'|'+y)
      myDiv.classList.add('path');
      document.body.appendChild(myDiv);
    }
  }
  generatecharacter();
}
function definiedDivs() {
  return (document.querySelectorAll('div'));
}

function generatecharacter() {
  const divs = definiedDivs();
  characterBlockNo = Math.floor(Math.random()*401);
  if (characterBlockNo < 10) {
    characterBlockNo = Number('0'+characterBlockNo);
  }
  characterDiv =divs[characterBlockNo];
  characterDiv.classList.add('character');
  generateEscapePoint();
  keyboardListener();
}

function generateEscapePoint() {
  const divs = definiedDivs();
  let rand = Math.floor(Math.random()*401);
  divs[rand].classList.remove('path');
  divs[rand].classList.add('escapePoint');
}

function keyboardListener() {
  document.addEventListener('keydown',move);
}

function checkArea(movement) {
  let xy = characterDiv.getAttribute('id').split('|');
  let x = xy[0];
  let y = xy[1];
  switch (movement) {
    case 20:
      y ++;
      break;
    case -20:
      y --;
      break;
    case 1:
      x ++;
      break;
    case -1:
      x --;
      break;
    default:
      return false;
  }
  if( x >= 0 && x <= 19 && y >= 0 && y <= 19) {
    return true;
  } else {
    return false;
  }
}

function controlNextDiv(nextDiv) {
  nextDivClass = nextDiv.getAttribute('class');
  switch (nextDivClass) {
    case 'escapePoint':
     characterDiv.classList.remove('character');
      newGame();
      break;
    default:
      return true;
  }
}

function move(e) {
  const divs = definiedDivs();
  let order = e.keyCode;
  let movement;
  let keyCheck = false;
  let nextDiv;

  switch(order) {
    case 37:
    keyCheck = true;
     movement = -1;
    break;

    case 38:
    keyCheck = true;
    movement = -20;
    break;

    case 39:
    keyCheck = true;
    movement = 1;
    break;

    case 40:
    keyCheck = true;
    movement =20;
    break;
  }

  if(keyCheck==true) {
    if(checkArea(movement) == true)
      {
      nextDiv = divs[characterBlockNo+movement];
       if(controlNextDiv(nextDiv) == true) {
        characterDiv.classList.remove('character');
        nextDiv.classList.add('character');
        characterBlockNo += movement;
        characterDiv = nextDiv;
      }
    }
  }
}

function newGame() {
  const divs = definiedDivs();
  for (i of divs) {
    i.remove();
  }
  createMap();
}


let characterBlockNo = 0;
let characterDiv;
createMap();
