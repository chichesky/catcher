function clickButton() {
  if (this.textContent=="Create Map") {
    this.textContent = "Recreate";
  }
  startGame(getWallNumber(),getFourthAreaValues());
}

const createMapBtn = document.getElementById('createMap');
createMapBtn.addEventListener('click',clickButton);
