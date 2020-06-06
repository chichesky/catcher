function giveEmojis() {
  if(document.getElementById("gameEmoji")!=null) {
    removeOldEmoji();
  }
  const emojiStyles = document.createElement('style');
  emojiStyles.textContent =
  ":root { --wallEmoji:'"+EmojiBlocks[0]+
  "'; --rivalEmoji:'"+EmojiBlocks[1]+
  "'; --enemyEmoji:'"+EmojiBlocks[2]+
  "'; --targetEmoji:'"+EmojiBlocks[3]+
  "'; --playerEmoji:'"+EmojiBlocks[4]+"'; }";
  emojiStyles.setAttribute('id',"gameEmoji");
  document.head.appendChild(emojiStyles);
  firstTimeForEmojis = false;
}

function removeOldEmoji() {
  document.head.removeChild(document.getElementById("gameEmoji"));
}

function setFirstEmojis() {
  for (let blocks of emojiArea.children) {
    takeEmoji(blocks.children[1]);
  }
}

function getEmoji(){
  if(this.getAttribute("name") == "nonselected") {
    takeEmoji(this);
  }
}

function setEmojiBlock(emojiBox,emoji) {
  switch (emojiBox.parentNode.getAttribute("id")) {
    case "wallEmoji":
      EmojiBlocks[0]=emoji;
      break;
    case "rivalEmoji":
      EmojiBlocks[1]=emoji;
      break;
    case "enemyEmoji":
      EmojiBlocks[2]=emoji;
      break;
    case "targetEmoji":
      EmojiBlocks[3]=emoji;
      break;
    case "playerEmoji":
      EmojiBlocks[4]=emoji;
      break;
    default:
      break;
  }
  giveEmojis();
}

function takeEmoji(emojiBox) {
  for (let clear of emojiBox.parentNode.children) {
    if (clear.getAttribute("name") == "selected") {
      clear.setAttribute("name","unselected");
      clear.classList.remove("selected");
    }
  }
  emojiBox.classList.add("selected");
  emojiBox.setAttribute("name","selected");
  setEmojiBlock(emojiBox,emojiBox.textContent);
}

const emojiArea = document.getElementById("emojiArea");
for (let blockType of emojiArea.children){
  for (let emojis of blockType.children) {
    if (emojis.nodeName == "DIV") {
      emojis.addEventListener("click",getEmoji);
    }
  }
}

let EmojiBlocks =[0,0,0,0,0];
setFirstEmojis();
