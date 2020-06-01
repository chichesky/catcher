function automatic() {
  activeAutomatic = setInterval(orientation, 150);
  autoBtn.textContent="stopAutoMove";
  autoBtn.removeEventListener('click',automatic);
  autoBtn.addEventListener('click',stopAutomatic);
}

function stopAutomatic() {
  autoBtn.textContent="AutoMove";
  clearInterval(activeAutomatic);
  autoBtn.removeEventListener('click',stopAutomatic);
  autoBtn.addEventListener('click',automatic);
}

function defineDivs() {
  return document.querySelectorAll('div');
}

function random(x) {
  return Math.floor(Math.random()*x);
}


function findChracterDiv() {
  return document.getElementsByClassName("character")[0];
}
function findChracterCor() {
  return findChracterDiv().getAttribute('id').split('|')
}
function chracterDivNumber() {
  const divs = defineDivs();
  for (let a in divs) {
    if(divs[a].getAttribute('class') == findChracterDiv().getAttribute('class')){
        return Number(a);
    }
  }
}


function findEscapeDiv() {
  return document.getElementsByClassName("escape")[0];
}
function findEscapeCor() {
  return findEscapeDiv().getAttribute('id').split('|');
}


function orientation() {
  const divs = defineDivs();
  let charDiv = findChracterDiv();

  const directions = [1,-1]
  let movement = [];

  let xy = findChracterCor();
  let x = Number(xy[0]);
  let y = Number(xy[1]);
  let axes = [x, y];

  for (let axis in axes) {
    for (let orient of directions) {
      let controlAxis = axes[axis] + orient;
      if( controlAxis >= 0 && controlAxis <= 19){
        switch (axis) {
          case '0':
          if (orient == 1) {
            movement.push(1);
          } else {
            movement.push(-1);
          }
            break;
          case '1':
          if(orient==1) {
            movement.push(20)
          } else {
            movement.push(-20);
          }
            break;
          default:
            break;
        }
      }
    }
  }
  let moveableDivs = [];
  for (let moveInArea in movement) {
    let nextDiv = divs[chracterDivNumber()+movement[moveInArea]];
    let nextDivPro = lookForNextDiv(nextDiv);
    if (nextDivPro[0]) {
      moveableDivs.push([nextDiv,nextDivPro[1],movement[moveInArea],nextDivPro[2]]);
    }
  }

  let choice = sense(charDiv, moveableDivs,x,y);
  makeAutoMove(charDiv, choice[0], choice[1],x,y);
}

function sense(charDiv, moveableDivs,x,y) {
  const options = moveableDivs;
  const ways = [-1, -20, 1, 20];
  for (let searchEscape of moveableDivs) {
    if (searchEscape[1]=='escape') {
      return searchEscape;
    }
  }

  const xyE = findEscapeCor();
  let difX = Number(xyE[0]) - x;
  let difY = Number(xyE[1]) - y;

  let givePriority = [];
  let secondly = [];
  let majorMoves = [];
  let minorMoves = [];

  if (difX < 0) {
    givePriority.push(-1);
  } else if (difX > 0) {
    givePriority.push(1);
  } else {
    secondly.push(-1);
    secondly.push(1);
  }

  if (difY < 0) {
    givePriority.push(-20);
  } else if (difY > 0) {
    givePriority.push(20);
  } else {
    secondly.push(-20);
    secondly.push(20);
  }

  let nonMovedMajor = [];
  let nonMovedMinor = [];
  let nonMoved = [];

  for (let searchMD of moveableDivs) {
    for(let majorMove of givePriority) {
      if(majorMove==searchMD[2]){
        majorMoves.push(searchMD);
        if (searchMD[3]!='moved') {
          nonMovedMajor.push(searchMD);
        }
      }
    }
  }

  for (searchMD of moveableDivs) {
    for(let minorMove of secondly) {
      if(minorMove==searchMD[2]){
        minorMoves.push(searchMD);
        if (searchMD[3]!='moved') {
          nonMovedMinor.push(searchMD);
        }
      }
    }
  }
  for (searchMD of moveableDivs) {
    if(searchMD[2]!='moved'){
      nonMoved.push(searchMD);
    }
  }


  if (nonMovedMajor.length > 0) {
    return (nonMovedMajor[random(nonMovedMajor.length)]);
  }
  else if (nonMovedMinor.length > 0) {
    return (nonMovedMinor[random(nonMovedMinor.length)]);
  }
  else if (nonMoved.length > 0) {
    return (nonMoved[random(nonMoved.length)]);
  }
  else {
    console.log("random");
    return moveableDivs[random(moveableDivs.length)];
  }

}

function lookForNextDiv(nextDiv) {
  let nextDivClass= nextDiv.getAttribute('class');
  let visited = nextDiv.getAttribute('id').split('|')[2];
  switch (nextDivClass) {
    case 'block':
      return [false,'block', visited];
      break;
    case 'escape':
      return [true,'escape', visited];
      break;
    default:
      return [true,'path', visited];
      break;
  }
}



function makeAutoMove(charDiv,nextDiv,divClass,x,y){
  charDiv.classList.add('path');
  charDiv.classList.remove('character');
  nextDiv.classList.add('character');
  nextDiv.classList.remove(divClass);
  charDiv.setAttribute('id',x+'|'+y+'|moved')
  switch (divClass) {
    case 'escape':
      addAutoReCreateScript()
    default:
      break;
  }
}

function addAutoReCreateScript() {
  const script = document.createElement('script');
  script.textContent = "reCreateMap()";
  document.body.appendChild(script);
}

let activeAutomatic;
