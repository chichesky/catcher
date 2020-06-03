function clickButton() {
  if (this.textContent=="Create Map") {
    this.textContent = "Recreate";
  }

  startGame(getWallNumber());
}

function wallSetRadioCheck() {
  if (this.id == "constant") {
    minWallNumber.disabled = true;
    maxWallNumber.disabled = true;
    wallNumber.disabled = false;
    wallRadios[0].checked=false;
    wallRadios[1].checked=true;
  } else if (this.id == "disableWall") {
  minWallNumber.disabled = true;
  maxWallNumber.disabled = true;
  wallNumber.disabled = true;
  wallRadios[0].checked=false;
  wallRadios[1].checked=false;
  } else {
  minWallNumber.disabled = false;
  maxWallNumber.disabled = false;
  wallNumber.disabled = true;
  wallRadios[0].checked=true;
  wallRadios[1].checked=false;
  }
}

function controlWallNumbers() {
  const randomNumbersAlert = document.getElementsByClassName('randomNumbersAlert')[0];
  if(Number(minWallNumber.value)>Number(maxWallNumber.value)) {
    randomNumbersAlert.style.display="block";
    randomNumbersAlert.getElementsByTagName('span')[0].addEventListener('click',function() {
      randomNumbersAlert.style.display="none";
      minWallNumber.value = 0;
      maxWallNumber.focus();
    });
  } else {
    randomNumbersAlert.style.display="none";
  }
}

function getWallNumber() {
  const randomNumbersAlert = document.getElementsByClassName('randomNumbersAlert')[0];
  switch (randomNumbersAlert.getAttribute('style')) {
    case "display: block;":
      randomNumbersAlert.style.display="none";
      break;
    default:
      break;
  }
  if (wallRadios[2].checked) {
    return(0,0);
  }
  else {
    if (wallRadios[0].checked) {
      let minWallNumberValue = Number(minWallNumber.value);
      let maxWallNumberValue = Number(maxWallNumber.value);
      if(minWallNumberValue <= 200
        && minWallNumberValue >= 0 &&
        maxWallNumberValue <= 200
        && maxWallNumberValue >= 0 &&
        minWallNumberValue <= maxWallNumberValue) {
          return [maxWallNumberValue,minWallNumberValue];
      } else {
        maxWallNumber.value=80;
        minWallNumber.value=0;
        return [80,0];
      }
    } else {
      let wallNumberValue = wallNumber.value;
      if(wallNumberValue>=0 && wallNumberValue<=200) {
        return [wallNumberValue,wallNumberValue-1];
      } else {
        wallNumber.value=80;
        return [80,80];
      }
    }
  }
}

const createMapBtn = document.getElementById('createMap');
const wallRadios = document.getElementsByName('wallSelection');
const minWallNumber = document.getElementById('minWallNumber');
const maxWallNumber = document.getElementById('maxWallNumber');
const wallNumber = document.getElementById('wallNumber');

window.addEventListener("load",wallSetRadioCheck);
window.addEventListener("load",controlWallNumbers);

for (let wallRadio of wallRadios) {
  wallRadio.addEventListener('change',wallSetRadioCheck);
}
minWallNumber.addEventListener('change',controlWallNumbers);
maxWallNumber.addEventListener('change',controlWallNumbers);
createMapBtn.addEventListener('click',clickButton);
