function giveColors() {
  const gameColorStyle = document.createElement('style');
  gameColorStyle.textContent =":root { --bgColor:"+colorsOfGame[0][1]+"; --wallColor:"+colorsOfGame[1][1]+"; --rivalColor:"+colorsOfGame[2][1]+"; --enemyColor:"+colorsOfGame[3][1]+"; --targetColor:"+colorsOfGame[4][1]+"; --playerColor:"+colorsOfGame[5][1]+"; }";
  gameColorStyle.setAttribute('id',"gameColor");
  document.head.appendChild(gameColorStyle);
}

function giveEmojisColors() {
  if(document.getElementById("bgColorStyle")!=null) {
    removeOldBgColor();
  }
  const bgColorStyle = document.createElement('style');
  bgColorStyle.textContent =":root { --bgColor:"+colorsOfGame[0][1]+"; --wallColor:"+colorsOfGame[0][1]+"; --rivalColor:"+colorsOfGame[0][1]+"; --enemyColor:"+colorsOfGame[0][1]+"; --targetColor:"+colorsOfGame[0][1]+"; --playerColor:"+colorsOfGame[0][1]+"; }";
  bgColorStyle.setAttribute('id',"bgColorStyle");
  document.head.appendChild(bgColorStyle);
}

function removeOldBgColor() {
  document.head.removeChild(document.getElementById("bgColorStyle"));
}

function removeOldColor() {
  document.head.removeChild(document.getElementById("gameColor"));
}

function setOptions(decision){
  for (let colorName of colorsOfMenu) {
    let color = switchColorToColor(colorName.getAttribute('name'));
    switch (decision) {
      case "name":
        setOptionsNames(colorName,color);
        break;
      default:
        setOptionsColors(colorName,color);
        setOptionsNames(colorName,color);
    }
  }
}

function setOptionsColors(colorName,color) {
    colorName.style.backgroundColor = color;
}

function setOptionsNames(colorName,color) {
  colorName.textContent = null;
  for (let specific of colorsOfGame) {
    if (specific[1]==color){
      colorName.textContent = specific[2];
    }
  }
}

function switchColorToColor(color) {
  switch (color) {
    case "color1":return color1;break;case "color2":return color2;break;
    case "color3":return color3;break;case "color4":return color4;break;
    case "color5":return color5;break;case "color6":return color6;break;
    case "color7":return color7;break;case "color8":return color8;break;
    case "color9":return color9;break;case "color10":return color10;break;
    default:break;
  }
}

function menuOpenAndClose(options,decision) {
  for (let option of options) {
    if (option.nodeName == "DIV") {
        option.style.display=decision;
      if (decision == "block") {
        option.addEventListener('click', takeColor);
      } else {
        option.removeEventListener('click', takeColor);
      }
    }
  }
}

function takeColor() {
  if (this.textContent == ""){
    let color = switchColorToColor(this.getAttribute('name'));
    let menu = this.parentNode.getAttribute('name');
    for (let block of colorsOfGame) {
      if (block[0] == menu) {
        block[1] = color;
      }
    }
    giveColors();
    setOptions("name");
  } else {
    giveAlert(this);
  }
}

function decideMenuFeature() {
  const options = this.children;
  if (openedMenu != undefined && openedMenu != this) {
    menuOpenAndClose(openedMenu.children,"none");
  }
  if (options[1].getAttribute('style').search('display: block;') == -1) {
    menuOpenAndClose(options,"block")
    openedMenu = this;
  } else {
    menuOpenAndClose(options,"none")
    openedMenu = undefined;
  }
}

function giveAlert(wrongSelection) {
  const color = switchColorToColor(wrongSelection.getAttribute('name'));
  let parent = wrongSelection.parentNode.getAttribute("name");
  let parentColor;
  for (let searchColor of colorsOfGame) {
    if (searchColor[0] == parent) {
      parentColor = searchColor[1];
    }
  }
  if (parentColor != color) {
    const alert = document.getElementById('colorAlert');
    const okay = document.getElementById("colorAlertButtonOkay");
    const change = document.getElementById("colorAlertButtonChange");
    const text = document.getElementById("alertNumberText1");
    const text2 = document.getElementById("alertNumberText2");
    text.innerHTML = color;
    text2.innerHTML = wrongSelection.textContent;
    alert.classList.add('colorAlertVisible');
    okay.addEventListener('click',closeAlert);
    change.addEventListener('click',function (){
      changeColors(wrongSelection.textContent,color,parent,parentColor);
    });
  } else {}
}
function changeColors(first,firstColor,second,secondColor) {
  let change1;
  let change2;
  for (let change of colorsOfGame) {
    if (change[2]==first) {
      change[1]=secondColor;
    } else if (change[0]==second) {
      change[1]=firstColor;
    } else {}
  }
  closeAlert();
  giveColors();
  setOptions("name");
}

function closeAlert(){
  document.getElementById('colorAlert').classList.remove('colorAlertVisible');
}

const colorsOfMenu = document.getElementsByClassName("option")
const colorSelections = document.getElementsByClassName('colorsSelection');
for (let colorSelection of colorSelections) {
  colorSelection.addEventListener('click',decideMenuFeature);
}
let openedMenu;

const menuColor1 = document.getElementsByName("color1");
const menuColor2 = document.getElementsByName("color2");
const menuColor3 = document.getElementsByName("color3");
const menuColor4 = document.getElementsByName("color4");
const menuColor5 = document.getElementsByName("color5");
const menuColor6 = document.getElementsByName("color6");
const menuColor7 = document.getElementsByName("color7");
const menuColor8 = document.getElementsByName("color8");
const menuColor9 = document.getElementsByName("color9");
const menuColor10 = document.getElementsByName("color10");
const menuColors = [menuColor1,menuColor2,menuColor3,menuColor4,
menuColor5,menuColor6,menuColor7,menuColor8,menuColor9,menuColor10];

const color1="DarkSlateGray";
const color2="WhiteSmoke";
const color3="RosyBrown";
const color4="CadetBlue";
const color5="PaleTurquoise";
const color6="MediumSeaGreen";
const color7="Khaki";
const color8="Coral";
const color9="FireBrick";
const color10="RebeccaPurple";
let colorsOfGame = [
  ["bgColor",color1,"Background Colour"],
  ["wallColor",color2,"Walls Colour"],
  ["rivalColor",color3,"Rival Colour"],
  ["enemyColor",color4,"Enemy Colour"],
  ["targetColor",color5,"Target Colour"],
  ["playerColor",color6,"Colour"]
];


window.addEventListener("load",function(){
  setOptions("total");
});
