function createMap() {

// SET MAP //
  const cont = document.querySelector('content');
  for(let y = 0; y < 20; y++) {
    for(let x = 0; x < 20; x++) {
      const myDiv = document.createElement('div');
      myDiv.setAttribute('id',x+'|'+y)
      ids.push(x+'|'+y);
      myDiv.classList.add('path');
      cont.appendChild(myDiv);
    }
  }
  setStufs();
}

function reCreateMap() {
  const divs = document.querySelectorAll('div');
  let i = 0;
  for (let x of divs) {
    x.setAttribute('class','path');
    x.setAttribute('id',ids[i]);
    i++;
  }
  if(level!="random"){
    levelLabel.textContent = level;
    level ++;
  } else {
    levelLabel.textContent="Random";
  }
  setStufs();
}


function setStufs () {
  const divs = document.querySelectorAll('div');

  //SET CHRACTER //
  let chracterBlockNo = random(400);
  chracterDiv = divs[chracterBlockNo];
  chracterDiv.classList.remove('path');
  chracterDiv.classList.add('character');

  //SET ESCAPE POINT//
  let escapeBlockNo;
  let escapeDiv;
  do {
    escapeBlockNo = random(400);
    escapeDiv = divs[escapeBlockNo];
  } while (escapeDiv.getAttribute('class')!="path");
  escapeDiv.classList.remove('path');
  escapeDiv.classList.add('escape');

  //SET BLOCKS//
  let numberOfBlock
  if (level < 90) {
    numberOfBlock = level+10;
  } else {
    numberOfBlock = random(100);
  }
  let blockNo;
  for (let i = 0; i < numberOfBlock; i++) {
    do {
      blockNo = random(400);
    } while(divs[blockNo].getAttribute('class') != 'path');
    divs[blockNo].classList.remove('path');
    divs[blockNo].classList.add('block');
  }
}


function random(x) {
  return Math.floor(Math.random()*x);
}

function levelChange(){
  let levelChanger = (document.querySelector('select').value);
  if (levelChanger == "random") {
    level = "random";
  } else {
    level = levelChanger
  }
  reCreateMap();
}

function reCreateMapBtn() {
  if (level != "random" && level != 1) {
    level--;
  }
  reCreateMap();
}

let levelLabel = document.querySelector('span');
let level = 1;
levelLabel.textContent = level;
let ids= [];
