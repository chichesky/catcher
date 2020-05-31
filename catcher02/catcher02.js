function createMap() {
  const cont = document.querySelector('content');
  for(let y = 0; y < 15; y++) {
    for(let x = 0; x < 15; x++) {
      const myDiv = document.createElement('div');
      myDiv.setAttribute('id',x+'|'+y)
      myDiv.classList.add('path');
      cont.appendChild(myDiv);
    }
  }
  generatecharacter();
}
function definiedDivs() {
  return (document.querySelectorAll('div'));
}

function moveCost() {
  money --;
  writeMoney();
}

function addMoney() {
  money += 19;
  device -= 1;
  writeMoney();
  generateConsumer();
}

function spendMoney() {
  money -= 9;
  device += 1;
  writeMoney();
  generateDevice();
}


function writeMoney() {
  let moneyArea = document.querySelectorAll('span');
  moneyArea[0].innerHTML = money;
  moneyArea[1].innerHTML = device;
}

function generatecharacter() {
  const divs = definiedDivs();
  characterBlockNo = Math.floor(Math.random()*226);
  if (characterBlockNo < 10) {
    characterBlockNo = Number('0'+characterBlockNo);
  }
  characterDiv =divs[characterBlockNo];
  characterDiv.classList.add('character');
  keyboardListener();
}

function generateDevice() {
  const divs = definiedDivs();
  function generate() {
    let random = Math.floor(Math.random()*225)
    if (divs[random].getAttribute('class') != "path") {
      generate();
    } else {
      divs[random].classList.remove("path");
      divs[random].classList.add("device");
      let i = Math.floor(Math.random()*8+1);
      divs[random].style.backgroundImage = "url(devices/device"+i+".png)";
      counterDevice ++;
    }
  }
    generate();
}

function generateConsumer() {
  const divs = definiedDivs();
  function generate() {
    let random = Math.floor(Math.random()*226)
    if (divs[random].getAttribute('class') != "path") {
      generate();
    } else {
      divs[random].classList.remove("path");
      divs[random].classList.add("consumer");
      let i = Math.floor(Math.random()*10+1);
      divs[random].style.backgroundImage = "url(consumerAvatars/avatar"+i+".png)";
      counterCostumer++;
    }
  }
    generate();
}

function randomChar() {
  let i = Math.floor(Math.random()*8);
  if((i+eventlessMove)>10) {
    if (counterDevice<4 && counterCostumer <4) {
      eventlessMove=0;
      let x = Math.floor(Math.random()*2);
      switch (x) {
        case 0:
          generateConsumer();
          break;

        case 1:
          generateDevice();
          break;
      }
    } else if (counterDevice<4) {
      generateDevice();
    } else if (counterCostumer<4) {
      generateConsumer();
    } else {

    }
  }
}

function keyboardListener() {
  document.addEventListener('keydown',move);
}

function checkArea(movement) {
  let xy = characterDiv.getAttribute('id').split('|');
  let x = xy[0];
  let y = xy[1];
  switch (movement) {
    case 15:
      y ++;
      break;
    case -15:
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
  if( x >= 0 && x <= 14 && y >= 0 && y <= 14) {
    return true;
  } else {
    return false;
  }
}

function controlNextDiv(nextDiv) {
  nextDivClass = nextDiv.getAttribute('class');
  switch (nextDivClass) {
    case 'consumer':
      if (device<=0) {
        return false;
      } else {
      nextDiv.classList.remove('consumer');
      nextDiv.style.backgroundImage = "";
      nextDiv.classList.add("path");
      addMoney();
      eventlessMove=0;
      return true;
      }
      break;
    case 'device':
    if (money>10) {
      nextDiv.classList.remove('device');
      nextDiv.style.backgroundImage = "";
      nextDiv.classList.add("path");
      spendMoney();
      eventlessMove=0;
      return true;
    } else {
      return false;
    }
      break;
    default:
      eventlessMove++;
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
    movement = -15;
    break;

    case 39:
    keyCheck = true;
    movement = 1;
    break;

    case 40:
    keyCheck = true;
    movement =15;
    break;
  }

  if(keyCheck==true) {
    if(checkArea(movement) == true)
      {
      nextDiv = divs[characterBlockNo+movement];
       if(controlNextDiv(nextDiv) == true) {
         if(money>0) {
          characterDiv.classList.remove('character');
          nextDiv.classList.add('character');
          characterBlockNo += movement;
          characterDiv = nextDiv;
          moveCost();
          randomChar();
        }
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

let counterCostumer = 0;
let counterDevice = 0;
let eventlessMove = 0;
let device = 0;
let money = 100;
let characterBlockNo = 0;
let characterDiv;
createMap();
writeMoney();
generateConsumer();
generateDevice();
