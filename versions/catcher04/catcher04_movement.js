function checkKey(e){
  let key = e.keyCode;
  let keyCheck= false;

  let xy = findChracterDiv().getAttribute('id').split('|');
  let x = Number(xy[0]);
  let y = Number(xy[1]);

  switch(key) {
    case 37:
    movement = -1;
    x--;
    if( x >= 0 && x <= 19 && y >= 0 && y <= 19){
      keyCheck = true;
    }
      break;

    case 38:
    movement = -20;
    y--;
    if( x >= 0 && x <= 19 && y >= 0 && y <= 19){
      keyCheck = true;
    }
      break;

    case 39:
    movement = 1;
    x++;
    if( x >= 0 && x <= 19 && y >= 0 && y <= 19){
      keyCheck = true;
    }
      break;

    case 40:
    movement =20;
    y++;
    if( x >= 0 && x <= 19 && y >= 0 && y <= 19){
      keyCheck = true;
    }
      break;

    default:
      break;
  }

  if (keyCheck){
    controlNextDiv(movement);
  }
}

function controlNextDiv(movement) {
  const divs = defineDivs();
  let thisDiv = findChracterDiv();
  let nextDiv = divs[thisDivNumber()+movement];
  let nextDivClass= nextDiv.getAttribute('class');
  switch (nextDivClass) {
    case 'block':
      break;
    case 'escape':
      makeMove(thisDiv,nextDiv,'escape');
      addReCreateScript();
      break;
    default:
      makeMove(thisDiv,nextDiv,'path');
      break;
  }
}

function makeMove(thisDiv,nextDiv,removeClass){
  thisDiv.classList.add('path');
  thisDiv.classList.remove('character');
  nextDiv.classList.add('character');
  nextDiv.classList.remove(removeClass);
}



function findChracterDiv() {
  return document.getElementsByClassName("character")[0];
}
function thisDivNumber() {
  const divs = defineDivs();
  for (let a in divs) {
    if(divs[a].getAttribute('class') == findChracterDiv().getAttribute('class')){
        return Number(a);
    }
  }
}

function defineDivs() {
  return document.querySelectorAll('div');
}


function addReCreateScript() {
  const script = document.createElement('script');
  script.textContent = "reCreateMap()";
  document.body.appendChild(script);
}



document.addEventListener('keydown',checkKey);
