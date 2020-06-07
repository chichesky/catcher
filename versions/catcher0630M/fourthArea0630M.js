function closeForthAreaSettings() {
  wallBreak.disabled=true;
  rivalOptions[2].disabled=true;
  disableEnemy.disabled=true;
  enemyNumber.disabled=true;
}

function firstFourthAreaSettings() {
  wallBreak.checked = false;
  wallBreak.disabled=true;
  rivalOptions[0].checked =true;
  disableEnemy.checked= true;
  enemyNumber.disabled=true;
  enemyNumber.value=1;
}

function getFourthAreaValues() {
  let decisions = [];
  switch (wallBreak.checked) {
    case true:
      decisions[0] = "breakableWall";
      break;
    case false:
      decisions[0] = "unbreakableWall";
    default: break;
  }
  for (let option of rivalOptions) {
    if(option.checked) {
      decisions[1] = option.id;
    }
  }

  if (disableEnemy.checked) {
    decisions[2] = 0;
  } else {
    if (enemyNumber.value <=10 && enemyNumber.value > 0) {
    decisions[2] = Number(enemyNumber.value);
    }else {
      enemyNumber.value=1;
      decisions[2] = 1;
    }
  }
  return decisions;
}

function controlDisableEnemy() {
  if (disableEnemy.checked) {
    enemyNumber.disabled=true;
  } else {
    enemyNumber.disabled=false;
  }
}


const wallBreak = document.getElementById("wallBreakable");
const rivalOptions = document.getElementsByName("playerOrBotRival");
const disableEnemy = document.getElementById("disableEnemy");
const enemyNumber = document.getElementById("enemyNumber");

disableEnemy.addEventListener("change", controlDisableEnemy);
firstFourthAreaSettings();
