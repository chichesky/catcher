function onLoad() {
  bgOrEmoji.checked=false;
  emojiBlock.style.display="block";
  chooseAppearance();
}

function chooseAppearance() {
  if (bgOrEmoji.checked != true) {
    makeWithColor();
  } else {
    makeWithEmoji();
  }
}

function makeWithColor() {
  if(document.getElementById("bgColorStyle")!=null) {
    removeOldBgColor();
  }
  if(document.getElementById("gameEmoji")!=null) {
    removeOldEmoji();
  }
  giveColors();
  emojiBlock.style.display="block";
  colorBlock.style.display="none";
}

function makeWithEmoji() {
  if(document.getElementById("gameColor")!=null) {
    removeOldColor();
  }
  giveEmojisColors();
  giveEmojis();
  colorBlock.style.display="block";
  emojiBlock.style.display="none";
}

const emojiBlock = document.getElementById("blockEmoji");
const colorBlock = document.getElementById("blockColor");
const bgOrEmoji = document.getElementById("bgOrEmoji");
bgOrEmoji.addEventListener("click",chooseAppearance);
onLoad();
